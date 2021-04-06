const redis = require("redis")
var crypto = require("crypto");
var bs62 = require('base-x')("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ") // its base 62, so there isnt / or + to interfere with web adresses
const { time } = require("console");
const rClient = redis.createClient({
    host: process.env.redis_addr,
    port: process.env.redis_port,
    password: process.env.redis_auth
})
const router = require("express").Router()

router.post("/", (req, res) => {
    var seconds = {
        day: 86400,
        week: 604800,
        month: 2678400
    }
    var title = bs62.encode(crypto.randomBytes(12))
    date = Date.now()
    data = {
        title: req.body.pasteTitle,
        text: req.body.pasteText,
        expire: date + seconds[req.body.pasteExpire] * 1000,
        date: date,
    }
    var text = JSON.stringify(data)
    rClient.setex(title, seconds[req.body.pasteExpire], text, (err) => {
        if (err != null) {
            res.send(err)
            return
        }
        res.redirect(`/get/${title}`)
    })
})

module.exports = router