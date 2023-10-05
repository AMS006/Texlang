const jwt = require('jsonwebtoken');

const isUser = async (req, res, next) => {
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            const token = req.headers.authorization.split(" ")[1];
            let {user} =  jwt.verify(token, process.env.JWT_SECRET);

            if(!user)
                return res.status(401).json({message: "Unauthorized"})

            req.user = user;
            next();
        }
        else
            return res.status(400).json({message:"Unauthorized"})
    } catch (error) {
        console.log("User-Middleware:", error.message);
        res.status(401).json({ message: "Something went wrong" });
    }
};

module.exports = isUser;