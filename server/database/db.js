const mongoose = require('mongoose')
const dotenv = require('dotenv')

const { databaseSuccessMsg } = require('../utils/messages')

dotenv.config()

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  databaseSuccessMsg('MongoDB connected')
}

module.exports = { connectDB }
