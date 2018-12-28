'use strict'

const _ = require('lodash')

const service = require('../jobs/service')

module.exports.getFactors = async function(ctx) {
  const number = parseInt(ctx.params.number)

  if (_.isNaN(number)) {
    ctx.body = 'This is not a number'
    ctx.status = 400
    return
  }

  const job = await service.get(number)

  // If we already have calculated prime factors for that number, let's return it immediately
  if (_.get(job, 'status') === 'done') {
    ctx.body = job.factors
    return
  }

  // If no job for that number, we create one & return 202 (Accepted)
  if (!job) service.create(number).catch(err => console.error(err))

  ctx.set({
    location: `/job/${number}`,
  })

  ctx.status = 202
}
