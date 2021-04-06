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

router.get('/', async (req, res) => {
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
        data = JSON.parse(reply)
        var lines = data.text.trim().split(/(?:\r\n)+/);
        res.render("paste", { title: data.title, text: lines, date: new Date(data.date).toUTCString(), expire: new Date(data.expire).toUTCString() })
    })
})

module.exports = router