const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const autopopulate = require('mongoose-autopopulate')

const User = new mongoose.Schema(
  {
    name: String,
    sessionId: String,
    totalScore: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
)

User.plugin(passportLocalMongoose, {
  usernameField: 'email',
  populateFields: ['name, sessionId'],
})

User.plugin(autopopulate)

module.exports = mongoose.model('User', User)