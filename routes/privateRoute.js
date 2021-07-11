const router = require('express').Router();
const verify = require('./verifyToken')

router.get('/pvt', verify, (req, res)=>{
    const {iat,exp} = req.user
    req.user.exp = new Date(exp*1000).toLocaleString();
    req.user.iat = new Date(iat*1000).toLocaleString();
    res.json({
        posts: {
            title: "Private Route",
            description: "Only authorized users are allowed",
            user: req.user
        }
    })
})

module.exports = router;