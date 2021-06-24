const Post=  require('../models/Post')
const Comment=  require('../models/Comment')
const ErrorResponse = require("../utils/errorResponse");
const {ObjectId} = require("bson");

/*Get all my posts*/
exports.readMyPosts= (req,res,next)=>{
    let userId= req.user._id
    Post.find({userId:userId}, async function(err, post) {
        if (!err) {
            if (!post){
                return next(new ErrorResponse("Il n'y a aucun post"),400)
            }
            res.status(200).json({
                success:true,
                data: post
            });
        }
        else {
            throw err;
        }
    }).sort({"createdAt": -1});
}

/*Get one of my posts by id*/
exports.readMyPost= (req,res,next)=>{
let id=ObjectId.createFromHexString(req.params.post)
    Post.find({_id:id}, async function(err, post) {
        if (!err) {
            if (!post){
                return next(new ErrorResponse("Le post n'existe pas"),400)
            }
            res.status(200).json({
                success:true,
                data: post
            });
        }
        else {
            throw err;
        }
    });
}

exports.createComment= async (req,res,next)=>{

    try{
        const{content,postId}=req.body;

let comment= new Comment({content:content,'userId':req.user._id,createdAt:Date.now()})
        let  post  = await Post.updateOne({_id: ObjectId(postId)},{
            $push:{
                "comments":{
                   comment
                }
            }
        });

        if (post.n!==0){
            res.status(200).json({success:true,data:"La modification a été effectuée avec succes"});
        }else {
            res.status(201).json({success:false,data:'Impossible de changer les valeurs'});
        }

    }catch (error){
        next(error);
    }

}


exports.updatePost= async (req,res,next)=>{
    try{
        const{title,content,id}=req.body;
        let  post  = await Post.updateOne({_id:id},{
            $set:{
                title:title,
                content:content,
                updatedAt:Date.now()
            }
        });
        if (post.n!==0){
            res.status(200).json({success:true,data:"La modification a été effectuée avec succes"});
        }else {
            res.status(201).json({success:false,data:'Impossible de changer les valeurs'});
        }

    }catch (error){
        next(error);
    }
}


exports.createPost= async (req,res,next)=>{
    const{title,content}=req.body;
    const userId=req.user._id
    const createdAt= Date.now();

    try{
      let  post  = await Post.create({
            title,content,userId,createdAt
        });
        res.status(200).json({success:true,data:post});

    }catch (error){
        next(error);
    }
}

exports.deletePost= async (req,res,next)=>{
    try{
      let id = req.body.id
        Post.findOneAndDelete({_id:id},function (err,post){
            if (!post){
                    return next(new ErrorResponse("Le post n'existe pas"),400)
            }
            res.status(200).json({success:true,data:'Post supprimé !'});
        })
    }catch (error){
        next(error);
    }
}

exports.deleteComment= async (req,res,next)=>{
    try{
        let id = req.body.id

        let  post  = await  Post.updateOne({"comments.comment._id" :ObjectId(id)}, {
            $unset: {
                "comments.$":true
            }
        });

        if (post.n!==0){
            res.status(200).json({success:true,data:"La modification a été effectuée avec succes"});
        }else {
            res.status(201).json({success:false,data:'Impossible de changer les valeurs'});
        }

    }catch (error){
        next(error);
    }
}


