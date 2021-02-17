const mongoose = require('mongoose')

const connectionString = process.env.MONGO_CONNECTION_STRING
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

module.exports = { mongoose }