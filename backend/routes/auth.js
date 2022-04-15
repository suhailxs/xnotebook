const { body, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();
const User = require('../models/User');

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
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          })
        res.json(user)
    }
    //catch errors
    catch(error){
        console.error(error.message);
        res.status(500).send('some error occurred');

    }
    
});


module.exports = router;