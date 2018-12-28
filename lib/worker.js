'use strict'

const config = require('../config')
const Job = require('./v1/jobs/service')

const { getPrimeFactors } = require('./utils/prime')

// Let's poll every X seconds for a new job, and pass its status to 'inprogress'
setTimeout(handler, config.worker.pollInterval)

// Execute job
async function handler() {
  const number = await Job.start()

  if (number) {
    console.log(`Starting job for ${number}...`)
    console.time(`getPrimeFactors(${number})`)

    const factors = getPrimeFactors(number)

    console.timeEnd(`getPrimeFactors(${number})`)

    await Job.finish(number, factors)
  }

  setTimeout(handler, config.worker.pollInterval)
}

// Job is done, let's write results & update status to 'done'
