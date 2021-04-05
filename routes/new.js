const redis = require("redis")
const rClient = redis.createClient({
    host: process.env.redis_addr,
    port: process.env.redis_port,
    password: process.env.redis_auth
})
const router = require("express").Router()

router.post("/", (req, res) => {
    var title = Math.random().toString(36).substring(7);
    var text = req.body
    rClient.set(title, text, (err) => {
        if (err != null) {
            res.send(err)
            return
        }
        res.send(title)
    })

})

module.exports = router