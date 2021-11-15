const torre = require('./torre.routers')

const router = function (server) {
  server.use('/torre', torre)
}

module.exports = router
