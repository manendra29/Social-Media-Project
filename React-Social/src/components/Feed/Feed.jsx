import "./Feed.css";
import Share from "../Share/Share.jsx"
import Post from "../Post/Post.jsx";
import { useContext, useEffect, useState } from "react";
import {AuthContext} from "../../context/AuthContext.jsx"
import axios from "axios";
// import {Posts} from "../../dummyData.js"

const Feed =({username}) =>{
const [posts,setPosts]=useState([]);
const {user}=useContext(AuthContext);



useEffect( () =>{
    const fetchPost=async () =>{
        // console.log(user._id.$oid
        //     ,user.username);
const res = username ? await axios.get("http://localhost:4000/api/posts/profile/"+username) : await axios.get("http://localhost:4000/api/posts/timeline/"+user._id.$oid);
      setPosts(res.data.sort((p1,p2) =>{
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }));
    }
    fetchPost();
},[username,user._id]);
    return(
        <div className="feed">
        <div className="feedWrapper">
          {(!username || username === user.username) && <Share />}

           {posts.map((p) =>(
            <Post key={p._id} post={p} />
           ))}
        </div>
        </div>
    )
}

export default Feed;