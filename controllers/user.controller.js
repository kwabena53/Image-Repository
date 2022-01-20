
const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')




router.post("/register", async (req, res) => {
    try {
      const { full_name, email, password } = req.body;
  
      if (!(email && password && full_name)) {
        res.status(400).send("All input is required");
      }
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(409).send("User with email already exist. Try logging in!");
      }
  
      encryptedPassword = await bcrypt.hash(password, 10);
  
      const user = await User.create({
        full_name,
        email: email.toLowerCase(), 
        password: encryptedPassword,
      });
  
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      user.token = token;
  
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
  });

  router.post("/login", async (req, res) => {

    try {
      const { email, password } = req.body;
  
      if (!(email && password)) {
        return res.send({error: "All input is required"});
      }
      const user = await User.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
  
        user.token = token;
  
        return res.json({data: user});
      }
      return res.send({error:"Invalid Credentials"});
    } catch (err) {
      console.log(err);
    }
  });
module.exports = router;