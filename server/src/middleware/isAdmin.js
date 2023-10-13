const jwt = require('jsonwebtoken');

const isAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.token
        let {user} =  jwt.verify(token, process.env.JWT_SECRET);

        if(!user)
            return res.status(401).json({message: "Unauthorized"})
        if (user?.role !== 'admin')
            return res.staus(401).json({message:"Unauthorized"})
        req.user = user;
        next();
    } catch (error) {
        console.log("User-Middleware:", error.message);
        res.status(401).json({ message: "Something went wrong" });
    }
};

module.exports = isAdmin;