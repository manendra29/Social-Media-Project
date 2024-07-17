import express from "express";
import { User } from "../model/userSchema.js";
import {Post} from "../model/postSchema.js";

const router=express.Router();

router.post("/create", async (req,res) =>{
    const post=new Post(req.body);
    try {
        await post.save();
        res.status(200).json("Post has been created successfully");
    } catch (error) {
        res.status(500).json(error);
    }
});

//update a post

router.put("/:id", async (req,res) =>{
    try {
        const post = await Post.findById(req.params.id);
        if(req.body.userId === post.userId){
            await post.updateOne({$set : req.body});
            res.status(200).json("Post has been updated");
        }
        else{
            res.status(403).json("You can update only your post");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

//delete a post

router.delete("/:id" ,async (req,res) =>{
    try {
        const post = Post.findById(req.params.id);
        if(req.body.userId === post.userId){
            await post.deleteOne();
            res.status(200).json("Post has been deleted successfully ");
        }
        else{
            res.status(403).json("You can delete only your own post");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

//like and dislike

router.put("/:id/like", async (req,res) =>{
    try {
        const post=await Post.findById(req.params.id);

        if(!post.likes.includes(req.body.userId.$oid)){
            await post.updateOne({$push : {likes: req.body.userId.$oid}});
            // console.log(req.body.userId.$oid);
            // console.log("yess");
            res.status(200).json("Post has been Liked");
        }
        else{
            // console.log("hello11");
            await post.updateOne({$pull : {likes : req.body.userId.$oid}});
            res.status(200).json("Post has been unliked successfully");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});


//timeline

router.get("/timeline/:userId" ,async (req,res) =>{
    try {
        const currUser=await User.findById(req.params.userId);
        const userPost=await Post.find({userId : currUser._id});
        const friendPost=await Promise.all(
            currUser.following.map((friendId) =>{
                return Post.find({userId : friendId});
            })
        );
        res.status(200).json(userPost.concat(...friendPost));
    } catch (error) {
        res.status(500).json(error);
    }
});


router.get("/profile/:username",async (req,res) =>{
    try {
        const user= await User.findOne({username:req.params.username});
        const post=await Post.find({userId: user._id});
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;