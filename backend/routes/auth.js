const { body, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');


const JWT_SECRET = 'suhailtechy';
//Create a User using: "/api/auth/". Doesn't require Auth
router.post('/createuser',[
    body('name').isLength({ min: 5 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
],async(req ,res)=>{
    //if there are error , return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check whether user with this email exist already]
    try{
        //create a new error
        let user = await User.findOne({email : req.body.email});
        if(user){
            return res.status(400).json({error : "email already exist"});
        };
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
          });
        const data = {
            user:{
                id : user.id
            }
        }
        const authtoken = jwt.sign(data,JWT_SECRET);
        // console.log(jwt_data)
        // res.json(user)
        res.json({authtoken});
    }
    //catch errors
    catch(error){
        console.error(error.message);
        res.status(500).send('some error occurred');

    }
    
});

//Authenticate User using: "/api/auth/". Doesn't require Auth
router.post('/login',[
    body('email').isEmail(),
    body('password').exists(),
],async(req ,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email , password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error : 'Please enter correct credentials'});
        }
        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({error : 'Please enter correct credentials'});
        }
        const data = {
            user:{
                id : user.id
            }
        };
        const authtoken = jwt.sign(data,JWT_SECRET);
        res.json({authtoken});
    } catch(error){
        console.error(error.message);
        res.status(500).send('Internal Server Occured');

    }


});
module.exports = router;