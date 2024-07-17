import "./Profile.css";
import Leftbar from "../../components/LeftBar/Leftbar.jsx";
import Topbar from "../../components/Topbar/Topbar";
import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/RightBar/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import {useParams} from "react-router";
const Profile =() =>{
    const PF=import.meta.env.REACT_APP_PUBLIC_FOLDER;
    const [user,setUser]=useState({});
    const username=useParams().username;
   

    useEffect(()=>{
        const fetchUser= async ()=>{
            const res= await axios.get(`http://localhost:4000/api/user?username=${username}`);
            // console.log(res.data);
            setUser(res.data);
        }
        fetchUser();
    },[username]);

    return (
        <>
             <Topbar />
        <div className="profile">
        <Leftbar />
        <div className="profileRight">
            <div className="profileRightTop">
            <div className="profileCover">
                <img className="profileCoverImg" src={user.coverPicture?PF+user.coverPicture : PF+"noCP.jpeg"} alt="coverImage" />
                <img className="profileUserImg" src={user.profilePicture?PF+user.profilePicture : PF+"noPP.jpg"} alt="UserImage" />
            </div>
            <div className="profileInfo">
            <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
            </div>
            </div>
            <div className="profileRightBottom">
            <Feed  username={username}/>
            <Rightbar key={user._id} user={user} />
            </div>
        </div>
       
        </div>
        </>
    )
}

export default Profile;