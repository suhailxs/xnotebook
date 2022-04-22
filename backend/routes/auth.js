const { body, validationResult } = require("express-validator");
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "suhailtechy";
let success = false;
//ROUTE 1 : Create a User using: "/api/auth/createuser". Doesn't require Auth
router.post(
  "/createuser",
  [
    body("name").isLength({ min: 5 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //if there are error , return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check whether user with this email exist already]
    try {
      //create a new error
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success , error: "email already exist" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      // console.log(jwt_data)
      // res.json(user)
      success=true;
      res.json({success, authtoken });
    } catch (error) {
      //catch errors
      console.error(error.message);
      res.status(500).send("some error occurred");
    }
  }
);

//ROUTE 2 :Authenticate User using: "/api/auth/login". No logging Required
router.post(
  "/login",
  [body("email").isEmail(), body("password").exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please enter correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({success, error: "Please enter correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      success=true
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Occured");
    }
  }
);
//ROUTE 3 :Get loggedin User Detail using: "/api/auth/getuser". require Auth
router.post("/getuser", fetchuser,async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Occured");
  }
});
module.exports = router;
