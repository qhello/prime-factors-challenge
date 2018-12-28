'use strict'

module.exports = {
  mongo: {
    url: process.env.MONGO_URL || 'mongodb://mongo:27017/craftai',
  },
  worker: {
    pollInterval: process.env.POLL_INTERVAL || 2000, // Polling interval, in milliseconds
  },
}
