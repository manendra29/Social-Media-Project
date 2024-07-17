import "./Rightbar.css";
import Online from "../Online/Online.jsx";
import {Users} from "../../dummyData.js"
import { Remove} from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import {Add} from "@mui/icons-material"
import { AuthContext } from "../../context/AuthContext.jsx";
const Rightbar =({user}) =>{
    const PF=import.meta.env.REACT_APP_PUBLIC_FOLDER;
    const [friends,setFriends]=useState([]);
    const {user :currentUser,dispatch}=useContext(AuthContext);
    const [followed,setFollowed]=useState(false);
    
    // useEffect(() =>{
    //     setFollowed(currentUser.following.includes(user?._id));
    // });
    useEffect(()=>{
        const getFriends= async ()=>{
            try {

                console.log("userId",user._id);
                console.log("manendra",currentUser._id.$oid);
             const res=await axios.get(`http://localhost:4000/api/user/friends/${user._id}`);
            setFriends(res.data);
        }
        catch(err){
            console.log(err);
        }
        }
        getFriends();
    },[user]);
    const handleClick =async()=>{
        try {
            if(followed){
                await axios.put("http://localhost:4000/api/user/"+user._id+"/unfollow",{userId:currentUser._id.$oid});
                dispatch({type:"UNFOLLOW",payload:user._id});
            }
            else{
                await axios.put("http://localhost:4000/api/user/"+user._id+"/follow",{userId:currentUser._id.$oid});
                dispatch({type:"FOLLOW",payload:user._id});
            }
            
        } catch (error) {
            console.log(error);
        }
        setFollowed(!followed);
    }
    const HomePageRightbar =() =>{
        return (
            <>
                 <div className="birthdayContainer">
                    <img className="birthdayImg" src="./assets/gift.png" alt="birthday" />
                    <span className="birthdayText">
                        <b>Ronak</b> and <b>3 other Friends</b> have Birthday today.
                    </span>
                </div>
                <img className="rightbarAd" src="./assets/ad.png" alt="Ad" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">                  
                    {Users.map((u) => (
                        <Online key={u.id} user={u} />
                    ))}
                </ul>
            </>
        )
    }

    const ProfilePageRightbar =() =>{
        return (
            <>
            {user.username !== currentUser.username &&
            <button className="rightbarFollowButton" onClick={handleClick}>
            {followed?"UnFollow":"Follow"}
            {followed?<Remove />:<Add />}
                
            </button>}
            <h4 className="rightbarTitle">User Information</h4>
                    <div className="rightbarInfo">
                        <div className="rightbarInfoItem">
                            <span className="rightbarInfoKey">City:</span>
                            <span className="rightbarInfoValue">{user.city}</span>
                        </div>

                        <div className="rightbarInfoItem">
                            <span className="rightbarInfoKey">Country:</span>
                            <span className="rightbarInfoValue">{user.from}</span>
                        </div>

                        <div className="rightbarInfoItem">
                            <span className="rightbarInfoKey">Relationship:</span>
                            <span className="rightbarInfoValue">{user.relationship == 1? "Single":user.relationship == 2? "married" : "none"}</span>
                        </div>
                    </div>
                    <h4 className="rightbarTitle">User's Friends</h4>
                    <div className="rightbarFollowings">
                    {friends.map((friend) =>(
                        <Link key={friend._id} to={"/profile/"+friend.username} style={{textDecoration:"none"}} >
                             <div className="rightbarFollowing">
            <img className="rightbarFollowingImg" src={friend.profilePicture?PF+friend.profilePicture : PF+"noPP.jpg"} alt="img" />
                            <span className="rightbarFollowingName">{friend.username}</span>
                        </div>
                        </Link>
                       
                    ))}      
                    </div>
               
            </>
        )
    }


    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
             {user?<ProfilePageRightbar />:<HomePageRightbar />}
            </div>
        </div>
    )
}

export default Rightbar;