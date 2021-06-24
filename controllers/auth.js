const ErrorResponse = require ('../utils/errorResponse')
const User=  require('../models/User')
const sendEmail= require('../utils/sendEmail')
const crypto = require('crypto')

/*Register Post*/
exports.register= async (req,res,next)=>{
    const{login,email,password}=req.body;
    try{
        const user= await User.create({
            login,email, password
        });
        sendToken(user,201,res,user);
    }catch (error){
        next(error);
    }
}

/*Login Post route*/
exports.login= async (req,res,next)=>{
    const {login,password}=req.body;
    if (!login||!password){
        return next(new ErrorResponse("Veuillez renseigner votre login et votre mot de passe"),400)
    }

    try{
        const user = await User.findOne({login:login}).select("+password");

        if (!user){
            return next(new ErrorResponse("Identifiants invalides"),401)
        }


        const isMatch= await user.matchPasswords(password)
        if (!isMatch){
            return next(new ErrorResponse("Identifiants invalides"),401)
        }
        sendToken(user,200,res,user);

    }catch (error){
        console.log(error)
        res.status(500).json({success:false,error:error})
    }
}

/*Forgot password Post Route*/
exports.forgotPassword= async (req,res,next)=>{
    const {email}=req.body;
    try {

        const user = await User.findOne({email})
        if (!user){
            return next(new ErrorResponse("Impossible d'envoyer le mail",404))
        }
        const resetToken=user.getResetPasswordToken();
        await  user.save();
        const resetUrl= `http://localhost:3000/reset-password/${resetToken}`
        const message = `<h1>Vous avez demandé la modification de votre mot de passe</h1>
                         <p>Veuillez Cliquer sur le lien suivant pour activer votre compte</p>
                         <a href="${resetUrl}" clicktracking=off>${resetUrl}</a>`
        try{
            await sendEmail({
                to: user.email,
                subject:"Changer mon mot de passe",
                text:message,
            });
            res.status(200).json({success:true,data:"Email Envoyé !"});

        }catch (error) {
            console.log(error)
            user.resetPasswordToken= undefined
            user.resetPasswordExpire= undefined

            await user.save();
            return next(new ErrorResponse("Impossible d'envoyer le mail"),500)

        }

    }catch (error) {
        next(error)
    }
}

/*ResetPassword Post Route*/
exports.resetPassword=async (req,res,next)=>{
    const resetPasswordToken= crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

    try{
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire:{ $gt:Date.now() }
        })

        if(!user){
            return next(new ErrorResponse("Token invalide"),400)
        }
        user.password= req.body.password
        user.resetPasswordToken= undefined
        user.resetPasswordExpire= undefined
        await user.save();

        res.status(200).json({
            success:true,
            data:'Mot de passe changé !'
        })
    }catch (error) {
        next(error)
    }
}

const sendToken= (user, statusCode,res)=>{
    const token=user.getSignedToken();
    res.status(statusCode).json({success:true,token,userId:user._id})
}