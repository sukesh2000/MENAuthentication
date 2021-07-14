const router = require('express').Router();

let checkAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    res.status(401).send("Unauthenticated");
}

router.get('/pvt', checkAuthenticated, (req, res)=>{
    const expires = new Date(req.session.cookie._expires).toLocaleString();
    res.json({
        posts: {
            title: "Private Route",
            description: "Only authorized users are allowed",
            user: req.user,
            expireTime: expires
        }
    })
})

module.exports = router;