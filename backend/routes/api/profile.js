const express =require('express');
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile');
const User = require('../../models/Users')
const { check, validationResult } = require('express-validator');
const request = require('request');
const Posts =require('../../models/Posts');
router = express.Router();

//  get api/profile
// test route
// access public or private
// get profile by accessing user
router.get('/me',auth,async(req,res)=>{
    try{
        const profile = await Profile.findOne({user:req.user.id}).populate('user',
        ['name','avatar']);

        if(!profile){
            return res.status(400).json({msg:"there is no profile"})
        }
        res.json(profile);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("server error");
    }
});


// creating profile and update
router.post('/', auth,
check('status', 'Status is required').notEmpty(),
check('skills', 'Skills is required').notEmpty(),
async(req,res)=>{
    const errors=validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        website,
        skills,
        youtube,
        twitter,
        instagram,
        linkedin,
        facebook,
        status,
        githubusername,
        company,
        location,
        bio,
      } = req.body;
    // console.log(skills);
    const profileFields = {}
    profileFields.user = req.user.id;
    if(company)profileFields.company=company;
    if(website)profileFields.website=website;
    if(location)profileFields.location=location;
    if(bio)profileFields.bio=bio;
    if(status)profileFields.status=status;
    if(githubusername)profileFields.githubusername=githubusername;
    if(skills){
    profileFields.skills = skills.split(',').map(skill=>skill.trim());
    }

    profileFields.social={};
    if(twitter) profileFields.social.twitter = twitter;
    if(youtube) profileFields.social.youtube = youtube;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.linkedin = linkedin;
    if(instagram) profileFields.social.instagram = instagram ;
    
    
    try{
        let profile = await Profile.findOne({user:req.user.id});
        // console.log(profile);
        if(profile){
            profile = await Profile.findOneAndUpdate(
                {user:req.user.id},
                {$set:profileFields},
                {new:true}
            );
            return res.json(profile);
        }
        else {
            // creating profile if profile not existed
            profile =new Profile(profileFields);
            console.log(profile);
            await profile.save();
            res.json(profile);
        }
        }
    
    catch(err){
        console.error(err.message);
        res.status(500).send("server error");
    }
    
    
});

// get all profiles 
// public
router.get('/',async(req,res)=>{
    try{
        const profiles = await Profile.find().populate('user',['name','avatar']);
        res.json(profiles);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("server error");
    }
});


// searching for other profile
router.get('/:userId',async(req,res)=>{
    try{
        const user_id= req.params.userId;
        const profile = await Profile.findOne({user:user_id}).populate('user',['name','avatar']);
        if(!profile){
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.json(profile);
    }
    catch(err){
        if(err.kind=='ObjectId'){
            return res.status(400).send("profile not found");
        }
        console.error(err.message);
        res.status(500).send("server error");
    }
})

// delete user and profile
router.delete('/',auth,async(req,res)=>{
    // remove profile
    try{
        console.log(req.user);
        await Profile.findOneAndRemove({user:req.user.id});
        // remove user
        await User.findOneAndRemove({_id:req.user.id});
        await Posts.deleteMany({user:req.user.id});
        res.json({msg:"deleted profile and user"});
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("server error");
    }
});


// adding experience 
router.post('/experience',
auth,
check('title','title is required')
.notEmpty(),
check('company','company is required')
.notEmpty(),
check('from','from date is required')
.notEmpty(),
async(req,res)=>{
    try{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description,
        }= req.body;
        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description,
        }

        try{
            const profile = await Profile.findOne({user:req.user.id});

            profile.experience.unshift(newExp);

            await profile.save();

            res.json(profile); 
        }
        catch(err){
            console.error(err.message);
        return res.status(500).send("server error");
        }
    }
    catch(err){
        console.error(err.message);
        return res.status(500).send("server error");
    }
});

// deleting experience
router.delete('/experience/:expId',
auth,
async(req,res)=>{
    try {
        const foundProfile = await Profile.findOne({ user: req.user.id });
    
        foundProfile.experience = foundProfile.experience.filter(
          (exp) => exp._id.toString() !== req.params.expId
        );
    
        await foundProfile.save();
        return res.status(200).json(foundProfile);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
      }
});

router.put(
    '/education',
    auth,
    check('college', 'College is required').notEmpty(),
    check('degree', 'Degree is required').notEmpty(),
    check('course', 'Course is required').notEmpty(),
    check('from', 'From date is required and needs to be from the past')
      .notEmpty()
      .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const profile = await Profile.findOne({ user: req.user.id });
  
        profile.education.unshift(req.body);
  
        await profile.save();
  
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );
  
  // @route    DELETE api/profile/education/:edu_id
  // @desc     Delete education from profile
  // @access   Private
  
  router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
      const foundProfile = await Profile.findOne({ user: req.user.id });
      foundProfile.education = foundProfile.education.filter(
        (edu) => edu._id.toString() !== req.params.edu_id
      );
      await foundProfile.save();
      return res.status(200).json(foundProfile);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: 'Server error' });
    }
  });
  
// get github top 5 project

router.get('/github/:username',(req,res)=>{
    try{
        let username = req.params.username;
        const options = {
            uri: `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&`,
            method:'GET',
            headers: { "user-agent":'node.js'}
        };
        request(options,(error,response,body)=>{
            if(error){
                return res.status(400).send("error related to github");
            }
            if(response.statusCode!==200){
                return res.status(404).json({msg:"no github user found"});

            }
            res.json(JSON.parse(body));
        })
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("server error");
    }
})
module.exports=router;