const redis = require("redis")
const rClient = redis.createClient({
    host: process.env.redis_addr,
    port: process.env.redis_port,
    password: process.env.redis_auth
})
const router = require("express").Router()

router.get("/", (req, res) => {
    res.render("home", { title: "Hello!" })
})

module.exports = router