const express =require('express');
const auth = require('../../middleware/auth');
const Post = require('../../models/Posts');
const User = require("../../models/Users");
const {check, validationResult} = require('express-validator');
var router = express.Router();

//  get api/post
// test route
// access public or private

// create post
router.post('/',
auth
,check("text","length should be greater than 9").isLength({min:10}),
async(req,res)=>{
    
    try{
        const errors= validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const {text} = req.body;
        const {id} = req.user;
        // console.log(id);
        const user = await User.findById(id).select('-password');

        const post = new Post({
            text:text,
            name:user.name,
            avatar:user.avatar,
            user:id,
        });
        let posts= await post.save();
        res.json(posts);
    }   
    catch(err){
        console.error(err);
        res.status(500).send("server errror");
    }
});

// get all post
router.get('/', auth, async (req, res) => {
    try {
      const posts = await Post.find().sort({ date: -1 });
      res.json(posts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // get profile by id
  router.get('/:id', auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
      }
  
      res.json(post);
    } 
    catch (err) {
        console.error(err.message);
        if(err.kind=='ObjectId'){
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
    }
    });

// delete post by post id
router.delete('/:P_id',auth,async(req,res)=>{
    try{

        const id = req.params.P_id;
        const post = await Post.findByIdAndDelete(id);
        if(!post){
            return res.status(404).json({ msg: 'Post not found' });
        }
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        
        res.json({msg:"post removed"});

    }catch(err){
        if(err.kind=='ObjectId'){
            return res.status(404).json({ msg: 'Post not found' });

        }
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});


// like post
router.put('/like/:id', auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      // Check if the post has already been liked
      if (post.likes.some((like) => like.user.toString() === req.user.id)) {
        return res.status(400).json({ msg: 'Post already liked' });
      }
  
      post.likes.unshift({ user: req.user.id });
  
      await post.save();
  
      return res.json(post.likes);
    } catch (err) { 
        if(err.kind=='ObjectId'){
            return res.status(404).json({ msg: 'Post not found' });

        }
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});
  
//unlike post
router.put('/unlike/:id', auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      // Check if the post has not yet been liked
      if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
        return res.status(400).json({ msg: 'Post has not yet been liked' });
      }
  
      // remove the like
      post.likes = post.likes.filter(
        ({ user }) => user.toString() !== req.user.id
      );
  
      await post.save();
  
      return res.json(post.likes);
    } catch (err) {
        if(err.kind=='ObjectId'){
            return res.status(404).json({ msg: 'Post not found' });

        }
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

router.post('/comment/:id',
auth,
check('text',"text is required").notEmpty(),
async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id);
      const post = await Post.findById(req.params.id);
      let comments =post.comments;

      let cur_comment = {
        name:user.name,
        user:req.user.id,
        text:req.body.text,
        avatar:user.avatar
      }
      console.log(cur_comment);
      comments.unshift(cur_comment);
      await post.save();
      res.json(post.comments);
    } 
    catch (err) {
      if(err.kind=='ObjectId'){
        return res.status(404).json({ msg: 'Post not found' });
      }
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});


// delete comment
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    post.comments = post.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await post.save();

    return res.json(post.comments);
  } catch (err) {
      if(err.kind=='ObjectId'){
        return res.status(404).json({ msg: 'Post not found' });
      }
      console.error(err.message);
      return res.status(500).send('Server Error');
  }
});
module.exports=router;