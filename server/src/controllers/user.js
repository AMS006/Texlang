const bcrypt = require('bcrypt');
const crypto = require('crypto')
const { db } = require('../../firebase');
const generateToken = require('../utils/generateToken');
const sendEmail = require('../utils/sendEmail');

exports.registerUser = async(req,res) =>{
    try {
        const {name,email,password} = req.body
        const userCollection = db.collection('users');
        const userSnapshot = await userCollection.where('email', '==' ,email).get();

        if(!userSnapshot.empty)
            return res.status(400).json({message:"User already Registered"})
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        await db.collection("users").add({name,email,password:hashedPassword})

        return res.status(201).json({message:"User Registered"})
    } catch (error) {
        console.log("User Registration : ", error.message)
        return res.status(500).json({message:"Something went wrong"})
    }
}

exports.loginUser = async(req,res) =>{
    try {
        const {email,password,code} = req.body;
        if(!email || !password || !code)
            return res.status(400).json({message:"Plzz provide all fields"})

        const userCollection = db.collection('users');
        const userSnapshot = await userCollection.where('email', '==', email).get();

        if(userSnapshot.empty)
            return res.status(404).json({message:"Invalid Email Id"})

        const userData = userSnapshot.docs[0].data();
        const userId = userSnapshot.docs[0].id;

        // To Verify Code
        const codeMatch = userData?.verificationCode == code;
        if(!codeMatch)
            return res.status(400).json({message:"Invalid Verification Code"})

        // To verify password
        const passwordMatch = await bcrypt.compare(password, userData?.password);
        if(!passwordMatch)
            return res.status(400).json({message:"Invalid Password"})

        const user = {
            id:userId,
            name: userData?.name,
            email: userData?.email,
        }
        
        const token = generateToken(user,'24h')
        const cookieOptions = {
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
          httpOnly: true,
          sameSite: "none",
          secure: false,
        };
        res.cookie("token", token, cookieOptions);
        
        return res.status(200).json({user,token})
    } catch (error) {
        console.log("User-Login : ", error.message)
        return res.status(500).json({message:"Something went wrong"})
    }
}

exports.sendCode = async(req,res) =>{
    try {
        const {email} = req.body
      
        const userCollection = db.collection('users');
        const userSnapshot = await userCollection.where('email', '==', email).get();
        if(userSnapshot.empty){
            return res.status(404).json({message:"User with email not registered"})
        }
        const code =  crypto.randomInt(0,1000000000)
        await sendEmail(email,code);
        
        const userDoc = userSnapshot.docs[0]
        await userDoc.ref.update({verificationCode:code})
        return res.status(200).json({message:"Verification code send to Email Id"})
    } catch (error) {
        console.log("Send Email : ", error.message)
        return res.status(500).json({message:"Something went wrong"})
    }
}

exports.getUser = async(req,res) =>{
    try {
        const user = req.user;
        
        if(!user)
            return res.status(404).json({message:"No User Found"})
      
        return res.status(200).json({user});
    } catch (error) {
        console.log("Get User Details: ",error.message)
      return res.status(500).json({ message: "Something went wrong" });
    }
}
exports.changePassword = async(req,res) =>{
    try {
        const user = req.user
        if(!user)
            return res.status(401).json({message:"Unauthorized"})

        const {newPassword,currentPassword} = req.body;
        const userDocRef = db.collection('users').doc(user.id);
        const userDoc = await userDocRef.get()
        if(!userDoc.exists){
            return res.status(404).json({message:"User Not Found"})
        }
        const passwordMatch = await bcrypt.compare(currentPassword,userDoc.data().password)
        if(!passwordMatch)
            return res.status(400).json({message:"Current Password does not match"})
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword,salt)
        await userDocRef.update({
            password:hashedPassword
        })
        return res.status(200).json({message:"Password Changed Successfully"})
    } catch (error) {
        console.log("Password-Change: ",error.message)
      return res.status(500).json({ message: "Something went wrong" });
    }
}
exports.forgotPassword = async(req,res) =>{
    try {
        const {email} = req.body
        const userCollection = db.collection('users');
        const userSnapshot = await userCollection.where('email', '==', email).get();
        if(userSnapshot.empty){
            return res.status(404).json({message:"User with email not registered"})
        }
        const code =  crypto.randomInt(0,1000000000)
        await sendEmail(email,code);
        
        const userDoc = userSnapshot.docs[0]
        await userDoc.ref.update({forgotPasswordCode:code})
        return res.status(200).json({message:"Verification code send to Email Id"})
    } catch (error) {
        console.log("Forgot-Password : ", error.message)
        return res.status(500).json({message:"Something went wrong"})
    }
}

exports.resetPassword = async(req,res) =>{
    try {
        const {email,newPassword,code} = req.body
     
        const userCollection = db.collection('users');
        const userSnapshot = await userCollection.where('email', '==', email).get();
        if(userSnapshot.empty){
            return res.status(404).json({message:"User with email not registered"})
        }
        const userData = userSnapshot.docs[0].data();

        const codeMatch = userData.forgotPasswordCode == code
        if(!codeMatch)
            return res.status(400).json({message:"Invalid Verification Code"})

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword,salt)

        const userDoc = userSnapshot.docs[0]
        await userDoc.ref.update({password:hashedPassword})

        return res.status(200).json({message:"Password Updated Successfully"})
    } catch (error) {
        console.log("Update-Password: ", error.message)
        return res.status(500).json({message:"Something went wrong"})
    }
}