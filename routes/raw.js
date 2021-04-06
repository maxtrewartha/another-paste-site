const redis = require("redis")
const rClient = redis.createClient({
    host: process.env.redis_addr,
    port: process.env.redis_port,
    password: process.env.redis_auth
})
const router = require("express").Router()

router.get('/', async (rew, res) => {
    res.redirect("/")
})

router.get("/:id", async (req, res) => {
    rClient.get(req.params.id, (err, reply) => {
        if (err != null) {
            res.send(err)
            return
        }
        if (reply == null) {
            res.render("404")
            return
        }
        res.format({
            'text/plain': () => {
                res.send(JSON.parse(reply).text)
            }
        })
    })
})

module.exports = router