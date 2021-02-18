const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const Quiz = new mongoose.Schema(
  {
    user: {
      type: 'ObjectId',
      ref: 'User'
    },
    category: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    }
  }
)

User.plugin(autopopulate)

module.exports = mongoose.model('Quiz', Quiz)