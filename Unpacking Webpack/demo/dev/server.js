var jsonServer = require('json-server')
var server = jsonServer.create()
var router = jsonServer.router('fakedb.json')
var middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(process.env.PORT || 80, function () {
  console.log('JSON Server is running')
})