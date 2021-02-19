const express = require('express')
const router = express.Router()
const Quiz = require('../models/quiz')
const User = require('../models/user')
const quizController = require('../controllers/quiz')
const request = require('request');

router.get('/score-board', quizController.ensureLogin, async (req, res, next) => {
  const scores = await User.find().sort({ totalScore: -1 }).limit(20)
  res.json(scores)
})

router.post('/', quizController.ensureLogin, async (req, res, next) => {
  
  const {category, score} = req.body
  if (score > -1 && score < 101) {
    await new Quiz({
      user: req.user._id,
      category,
      score
    }).save()
    await User.findByIdAndUpdate(req.user._id, {
      totalScore: score+req.user.totalScore
    })
    res.send('OK')
  } else {
    next(new Error("Unauthorized access"))
  }
  
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