'use strict'

const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const {
  mongo: { url },
} = require('../../config')

mongoose
  .connect(
    url,
    { useNewUrlParser: true }
  )
  .catch(err => console.error(err))

module.exports = mongoose
