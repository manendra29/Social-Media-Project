import "./Post.css";
import {AirplaySharp, MoreVert} from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import {format} from "timeago.js"
import axios from "axios";
import { AuthContext } from "../../context/AuthContext.jsx";

const Post =({post}) =>{
    const [like,setLike]=useState(post.likes.length);
    const [isLiked,setIsLiked]=useState(false);
    const [user,setUser]=useState({});

    const {user:currentUser}=useContext(AuthContext);

    useEffect(() =>{
        setIsLiked(post.likes.includes(currentUser._id));
    },[currentUser._id,post.likes])

    const PF=import.meta.env.REACT_APP_PUBLIC_FOLDER;
    const likeHandler = async () =>{
        try {
            console.log(post._id);
            await axios.put(`http://localhost:4000/api/posts/${post._id}/like`,{userId:currentUser._id});
        } catch (error) {
            console.log(error);
        }
       
        setLike(isLiked?like-1:like+1);
        setIsLiked(!isLiked);
    }

    useEffect(() =>{
        const fetchUser=async () =>{
        const res=await axios.get(`http://localhost:4000/api/user?userId=${post.userId}`);
        // console.log(res.data);
        setUser(res.data);
        }
        fetchUser();
},[post.userId])
    return(
        <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <img className="postProfileImg" src={user.profilePicture ?PF+user.profilePicture : PF+"noPP.jpg"} />
                    <span className="postUserName">{user.username}</span>
                    <span className="postDate">{format(post.createdAt)}</span>
                </div>
                <div className="postTopRight">
                <MoreVert />
                </div>
            </div>
            <div className="postCenter">
            <span className="postText">{post?.desc}</span>
                <img className="postImg" src={PF+post.img} alt="post" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt="like" />
                    <img className="likeIcon" src={`${PF}heart.png`} onClick={likeHandler} alt="heart" />
                    <span className="postLikeCounter">{like} People like it</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{post.comment} Comments</span>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Post;