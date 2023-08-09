const express =require('express');
const {check,validationResult} = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');


const User = require('../../models/Users');

const router = express.Router();

//  post api/users
// test route
// access public or private
router.post('/',[
    check("name","name is required")
    .not()
    .isEmpty(),
    check('email',"please include valid email")
    .isEmail(),
    check('password','please enter 5 or more character')
    .isLength({min:5})
],
async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    // user exist
    const {name,email,password} = req.body;
    try{
        let user = await User.findOne({email}); 
        
        if(user){
           return res.status(400).json({errors:[{msg:"user already exist"}]})
        }

        // get user avatar using gravatar
        const avatar =gravatar.url(email,{
            s:'200',
            r:'pg',
            d:'mm',
        });

        user = new User({
            name,email,avatar,password
        });


        //encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);

        await user.save();

        // return jwt
        
        const payload = {
            user:{
                id:user.id
            }
        }
        jwt.sign(payload,
            "mysecret",  // key ="mysecret"
            {expiresIn:36000000},
            (err,token)=>{
                if(err) throw err;
                console.log(token);
                res.json({token});
            });
    }
    catch(err){
        console.log("problem");
        console.error(err.message);
        res.status(500).send();
    }




    // res.send("hello"); 
});

module.exports=router;