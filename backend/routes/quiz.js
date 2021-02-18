const express = require('express')
const router = express.Router()
const Quiz = require('../models/quiz')
const quizController = require('../controllers/quiz')
const request = require('request');

router.get('/score-board', quizController.ensureLogin, async (req, res, next) => {
  const scores = await Quiz.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user'
      }
    },
    {
      $unwind: '$user'
    },
    {
      $unset: ["user._id", "user.salt", "user.hash", "user.createdAt", "user.updatedAt", "user.__v", "user.email"]
    }
  ])
  res.json(scores)
})

router.get('/questions/:code', quizController.ensureLogin, async (req, res, next) => {
  if(req.params.code >=9 && req.params.code <=32) {
    request(`https://opentdb.com/api.php?amount=20&category=${req.params.code}&difficulty=medium&type=multiple`, function (error, response, body) {
      if (error) {
        next(new Error("API Error"))
      } else {
        res.json(JSON.parse(body))
      }
    });
  } else {
    next(new Error("Unknown category"))
  }  
})

module.exports = router