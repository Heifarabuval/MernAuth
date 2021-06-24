const express= require('express');
const router = express.Router();

const {createPost} = require("../controllers/blog");
const {createComment} = require("../controllers/blog");
const {readMyPosts}= require('../controllers/blog')
const {readMyPost}= require('../controllers/blog')
const {updatePost} = require("../controllers/blog");
const {deletePost} = require("../controllers/blog");
const {deleteComment} = require("../controllers/blog");
const{protect}= require("../middlewares/auth")

router.route('/post/read').get(protect,readMyPosts);
router.route('/post/read/:post').get(protect,readMyPost);
router.route('/post/update').put(protect,updatePost);
router.route('/post/add').post(protect,createPost);
router.route('/comment/add').post(protect,createComment);
router.route('/post/delete').delete(protect,deletePost);
router.route('/comment/delete').delete(protect,deleteComment);
module.exports= router;