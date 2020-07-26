const ErrorResponse = require('../utils/errorResponse')
const { getDuplicate } = require('../utils/utils')

const errorHandler = (err, req, res, next) => {
  console.log(err)
  let error = { ...err }
  error.message = err.message

  //bad object id
  if (err.name === 'CastError') {
    const message = `Resources not found for ${err.value}`
    error = new ErrorResponse(message, 404)
  }

  //duplicate key
  if (err.code === 11000) {
    const errMsg = getDuplicate(err)
    const message = `Duplicate field value entered. ${errMsg} `
    error = new ErrorResponse(message, 400)
  }

  //validatior error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message)
    error = new ErrorResponse(message, 400)
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || `Server Error`,
  })
}

module.exports = errorHandler
