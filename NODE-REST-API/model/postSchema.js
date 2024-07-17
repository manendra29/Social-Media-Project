import mongoose from "mongoose";

const postSchema= new mongoose.Schema({
    userId:{
        type:String,
        require:true
    },
    desc:{
        type:String,
        max:500
    },
    likes:{
        type:Array,
        default:[]
    },
    img:{
        type:String,
        require:true,
    },
},
{timestamps:true}
);

export const Post=mongoose.model("Post",postSchema);