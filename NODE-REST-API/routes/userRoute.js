import express, { json } from "express";
import { User } from "../model/userSchema.js";
import bcrypt, {genSalt} from "bcrypt"
const router=express.Router();

// router.get("/",(req,res) =>{
//     res.send("This is User Route");
// });

router.put("/:id" , async (req,res) =>{
    if(req.body.userId === req.params.id || req.user.isAdmin){
        if(req.body.password){
            try {
                const salt=await bcrypt.genSalt(10);
                req.body.password=await bcrypt.hash(req.body.password,salt);
            } catch (error) {
                res.status(500).json(error);
            }
        }
        try {
            const user=await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            });
            res.status(200).json(user);
        } catch (error) {
           res.status(500).json(error); 
        }
    }
    else{
        res.status(400).json("You cannot update any thing");
    }
});


//delete

router.delete("/:id", async (req,res) =>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try {
            await User.deleteOne({_id:req.params.id});
            res.status(200).json("Account deleted successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else{
        res.status(400).json("You can delete only your account");
    }
});

//get a user

router.get("/",async (req,res) =>{
    const userId=req.query.userId;
    const username=req.query.username;
    try {
        const user=userId ? await User.findById(userId): await User.findOne({username:username});
        if(!user){
            return res.status(404).json("User not found");
        }
             
        const {password , updatedAt, ...other } = user._doc;
        // console.log(other);
        res.status(200).json(other);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/friends/:userId", async (req, res) => {
    try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
    user.following.map((friendId) => {
    return User.findById(friendId);
    })
    );
    let friendList = [ ];
    friends.map((friend) => {
    const { _id, username, profilePicture} = friend;
    friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
    } catch (err) {
    res.status(500).json(err);
    }
    });



//follow

router.put("/:id/follow" , async (req,res) =>{
    if(req.body.userId !== req.params.id){
        const user=await User.findById(req.params.id);
        const currUser=await User.findById(req.body.userId);

        if(!user.followers.includes(req.body.userId)){
            await user.updateOne({$push : {followers:req.body.userId}});
            await currUser.updateOne({$push : {following:req.params.id}});

            res.status(200).json("User has been followed now");
        }
        else{
            res.status(403).json("You already follow this user");
        }
    }
    else{
        res.status(400).json("You can't follow yourself!");
    }
});


//unfollow

router.put("/:id/unfollow" , async (req,res) =>{
    if(req.body.userId !== req.params.id){
        const user=await User.findById(req.params.id);
        const currUser=await User.findById(req.body.userId);

        if(user.followers.includes(req.body.userId)){
            await user.updateOne({$pull : {followers:req.body.userId}});
            await currUser.updateOne({$pull : {following:req.params.id}});

            res.status(200).json("User has been unfollowed now");
        }
        else{
            res.status(403).json("You don't follow this user");
        }
    }
    else{
        res.status(400).json("You can't unfollow yourself!");
    }
});


export default router;