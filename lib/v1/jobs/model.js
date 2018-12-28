'use strict'

const db = require('../../utils/db')

const Schema = new db.Schema(
  {
    number: Number,
    status: {
      type: String,
      allowedValues: ['pending', 'inprogress', 'done'],
      default: 'pending',
      required: true,
    },
    factors: { type: [Number] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    collection: 'jobs',
  }
)

Schema.statics.create = async function(number) {
  const job = new Job({
    number,
  })

  console.log(`New job created for ${number}`)

  return job.save()
}

Schema.statics.get = async function(number) {
  return this.findOne({ number })
}

Schema.statics.start = async function() {
  const job = await this.findOneAndUpdate({ status: 'pending' }, { $set: { status: 'inprogress' } })

  if (job) return job.number
}

Schema.statics.finish = async function(number, factors) {
  const job = await Job.get(number)

  job.status = 'done'
  job.factors = factors

  return job.save()
}

const Job = db.model('Job', Schema)

module.exports = Job
