const redis = require("redis")
var crypto = require("crypto");
const rClient = redis.createClient({
    host: process.env.redis_addr,
    port: process.env.redis_port,
    password: process.env.redis_auth
})
const router = require("express").Router()

router.post("/", (req, res) => {
    var title = crypto.randomBytes(12).toString('base64');
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