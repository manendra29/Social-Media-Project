import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:3,
        max:20,
        unique:true
    },
    email:{
        type:String,
        require:true,
        max:50,
        unique:true,
    },
    password:{
        type:String,
        require:true,
        min:6,
    },
    followers:{
        type:Array,
        default:[],
    },
    following:{
        type:Array,
        default:[]
    },
    profilePicture:{
        type:String,
        default:""
    },
    coverPicture:{
        type:String,
        default:""
    },
   isAdmin:{
    type:Boolean,
    default:false,
   },
   desc:{
    type:String,
    max:50,
   },
   from:{
    type:String,
    max:50
   },
   city:{
    type:String,
    max:50
   },
   relationship:{
    type:String,
    enum:[1,2,3]
   }
},
 {timestamps :true} //it will help us to make createdAT and updatedAt.
);

export const User=mongoose.model("User",userSchema);