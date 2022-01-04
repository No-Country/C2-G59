const router = require('express').Router()

function routerApi (app) {
  app.use('/api', router)
}

module.exports = routerApi
