'use strict'

const Job = require('./model')

module.exports.create = Job.create.bind(Job)

module.exports.get = Job.get.bind(Job)

module.exports.start = Job.start.bind(Job)

module.exports.finish = Job.finish.bind(Job)
