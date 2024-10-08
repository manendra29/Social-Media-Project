import express from "express";
import { User } from "../model/userSchema.js";
import bcrypt, { genSalt } from "bcrypt";
const router=express.Router();

//Register
router.post("/register",async (req,res) =>{
   
  
    try {
        const salt=await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(req.body.password,salt);

        const newUser=await new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
        });

        const user=await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        console.log(`Error occured: ${error}`);
        res.status(500).json(error);
    }
});

//login
// router.post("/login", async (req,res) =>{
//    try {
//     const user=await User.findOne({email : req.body.email});
//     !user && res.status(404).json("User not found");

//     const validPassword=await bcrypt.compare(req.body.password,user.password);
//     !validPassword && res.status(400).json("Invalid password");

//     res.status(200).json(user);
//    } catch (error) {
//     res.status(500).json(error);
//    }
// });

router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      !user && res.status(404).json("user not found");
  
      const validPassword = await bcrypt.compare(req.body.password, user.password)
      !validPassword && res.status(400).json("wrong password")
  
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  });

export default router;
