// Config stuff lmao
const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const mustache = require('mustache-express')
const app = express()
// Not using semi-colons feels kinda wrong but whatever

// Express options
app.set("views", `${__dirname}/views`)
app.set("view engine", "mustache")
app.engine("mustache", mustache())

// body-parser is depricated as of Express v4.16.0
app.use(express.text())
app.use(express.urlencoded({ extended: true }))

var rawRoute = require("./routes/raw")
var newRoute = require("./routes/new")
app.use("/raw", rawRoute)
app.use("/new", newRoute)

app.listen(process.env.web_port, () => {
    console.log(`Listening on port: ${process.env.web_port}`)
})
