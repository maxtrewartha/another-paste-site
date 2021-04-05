const redis = require("redis")
const rClient = redis.createClient({
    host: process.env.redis_addr,
    port: process.env.redis_port,
    password: process.env.redis_auth
})
const router = require("express").Router()

function newesc(s) {
    let lookup = {
        '&': "&amp;",
        '\'': "&apos;",
        '"': "&quot;",
        '<': "&lt;",
        '>': "&gt;",
    };
    return s.replace(/[&"<>]/g, (c) => lookup[c]);
}

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
            res.send("Error: paste does not exist")
            return
        }
        //console.log(reply)
        res.format({
            'text/plain': () => {
                res.send(newesc(reply))
            }
        })
    })
})

module.exports = router