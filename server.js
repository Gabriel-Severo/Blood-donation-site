// EXPRESS
const express = require('express')
const server = express()
server.use(express.static('public'))
server.use(express.urlencoded({extended: true}))

// DATABASE
require('dotenv').config()
const Pool = require('pg').Pool
const db = new Pool({connectionString: process.env.CONNECTION})
// NUNJUCKS
const nunjucks = require('nunjucks')
nunjucks.configure('./', {
    express: server,
    noCache: true
})

// LAST DONORS
server.get("/", function(req, res){
    db.query('SELECT * FROM donors', function(err, result){
        if (err) return res.send("Erro com o banco de dados")
        donors = result.rows
        res.render("index.html", {donors})
    })
})

// FORM
server.post("/", function(req, res) {
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    if (name == "" || email == "" || blood == ""){
        return res.send("Todos os campos devem ser preenchidos")
    }

    const query = `INSERT INTO donors ("name", "email", "blood") VALUES ($1, $2, $3)`
    const values = [name, email, blood]
    db.query(query, values, function(err) {
        if (err) return red.send("Erro ao enviar os dados para o banco de dados")
        return res.redirect("/")
    })
})

// SERVER
server.listen(3000, function() {
    console.log('Server started')
})