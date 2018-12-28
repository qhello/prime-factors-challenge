'use strict'

const Koa = require('koa')
const Router = require('koa-router')
const logger = require('koa-logger')

const app = new Koa()
const router = new Router()

const controller = {
  jobs: require('./v1/jobs/controller'),
  primeFactors: require('./v1/primeFactors/controller'),
}

router.get('/primeFactors/:number', controller.primeFactors.getFactors)
router.get('/job/:number', controller.jobs.getInfo)

app
  .use(logger())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)

console.log('Application running at http://localhost:3000/primeFactors/100')
