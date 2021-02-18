const express = require('express')
const router = express.Router()
const Quiz = require('../models/quiz')
const quizController = require('../controllers/quiz')

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

module.exports = router