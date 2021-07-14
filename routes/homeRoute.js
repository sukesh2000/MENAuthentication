const router = require('express').Router();

let checkAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    res.status(401).send("Please login first");
}

router.get('/', checkAuthenticated, (req, res)=>{
    const expires = new Date(req.session.cookie._expires).toLocaleString();
    res.json({
        posts: {
            title: "Private Route",
            description: "Only authenticated users are allowed",
            user: req.user,
            expireTime: expires
        }
    })
})

module.exports = router;