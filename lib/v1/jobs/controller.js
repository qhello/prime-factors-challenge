'use strict'

const _ = require('lodash')

const service = require('./service')

const prettyStatuses = {
  pending: 'Pending',
  inprogress: 'In Progress',
}

module.exports.getInfo = async function(ctx) {
  const number = parseInt(ctx.params.number)

  if (_.isNaN(number)) {
    ctx.body = 'This is not a number'
    ctx.status = 400
    return
  }

  const job = await service.get(number)

  if (!job) {
    ctx.status = 404
    return
  }

  const status = job.status

  if (status === 'done') {
    ctx.set({
      location: `/primeFactors/${number}`,
    })

    ctx.status = 303
  }

  ctx.body = {
    status: prettyStatuses[status],
  }
}
