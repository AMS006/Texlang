const jwt = require('jsonwebtoken');
const { db } = require('../../firebase');

const isAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.token
        let {user} =  jwt.verify(token, process.env.JWT_SECRET);

        if(!user)
            return res.status(401).json({message: "Unauthorized"})
       
        const userRef = db.collection('users')
        const userQuery = await userRef.doc(user.id).get()

        const userData = userQuery.data()
        if(!userData || !userData?.status || userData.role !== "admin"){
            return res.status(401).json({message:"Unauthorized"})
        }
        req.user = {
            id:userQuery.id,
            name:userData?.name,
            email:userData?.email,
            role:userData?.role        
        };
        next();
    } catch (error) {
        console.log("User-Middleware:", error.message);
        res.status(401).json({ message: "Something went wrong" });
    }
};

module.exports = isAdmin;