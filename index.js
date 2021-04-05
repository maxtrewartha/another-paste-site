// Config stuff lmao
const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const app = express()
// Not using semi-colons feels kinda wrong but whatever

// Express options
var exphbs = require('express-handlebars')
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
//app.enable('view cache');

// body-parser is depricated as of Express v4.16.0
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var mainRoute = require("./routes/main")
var getRoute = require("./routes/get")
var rawRoute = require("./routes/raw")
var newRoute = require("./routes/new")
app.use("/", mainRoute)
app.use("/get", getRoute)
app.use("/raw", rawRoute)
app.use("/new", newRoute)
app.use("/static", express.static(__dirname + "/static"))

app.get("*", (req, res) => {
    res.render("404")
})

app.listen(process.env.web_port, () => {
    console.log(`Listening on port: ${process.env.web_port}`)
})
