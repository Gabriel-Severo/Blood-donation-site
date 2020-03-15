// EXPRESS
const express = require('express')
const server = express()

server.use(express.static('public'))

// NUNJUCKS
const nunjucks = require('nunjucks')
nunjucks.configure('./', {
    express: server,
    noCache: true
})

server.get("/", function(req, res){
    res.render("index.html")
})

server.listen(3000, function() {
    console.log('Server started')
})