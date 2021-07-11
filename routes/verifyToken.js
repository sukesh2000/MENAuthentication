const jwt = require("jsonwebtoken");

module.exports = (req, res, next)=>{
    const token = req.header('Authorization');
    if(!token) return res.status(401).send("Access Denied");
    try{
        const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verifiedToken;
        next();
    }
    catch(err){
        if(err.name = "TokenExpiredError"){
            err.expiredAt = new Date(err.expiredAt).toLocaleString();
        }

        res.status(400).send(err);
    }
}
