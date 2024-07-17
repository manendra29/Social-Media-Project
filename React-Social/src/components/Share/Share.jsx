import { useContext, useRef, useState } from "react";
import "./Share.css";
import {AuthContext} from "../../context/AuthContext"
import {PermMedia,Label,Room,EmojiEmotions, Cancel} from "@mui/icons-material"
import axios from "axios";
const Share=() =>{
    const {user}=useContext(AuthContext);
    const PF=import.meta.env.REACT_APP_PUBLIC_FOLDER;
    // console.log(PF);
    const [file,setFile]=useState(null);
    const desc=useRef();
    // console.log("hiiii",user);
    // console.log("HEYYY",user.profilePicture);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const newPost={
            userId:user._id.$oid,
            desc:desc.current.value
        };

        if(file){
            const data=new FormData();
            console.log("file",file);
            const filename=Date.now()+file.name;
            data.append('file',file);
            data.append('name',file.name);
        
            // console.log(data.length);
            // console.log("filename",filename);
            // console.log(typeof filename);
            newPost.img=file.name;
            try {
                console.log("data",data);
                await axios.post("http://localhost:4000/api/upload",data);
            } catch (error) {
                console.log(error);
            }
        }
        try {
            console.log("newPost",newPost);
            await axios.post("http://localhost:4000/api/posts/create",newPost);
            window.location.reload();
        } catch (error) {
            
        }
    }

    return(
       <div className="share">
       <div className="shareWrapper">
        <div className="shareTop">
            <img className="shareProfileImage" src={user.profilePicture?PF+user.profilePicture : PF+"noPP.jpg"} />
            <input ref={desc} placeholder={"What's in your mind "+user.username} className="shareInput" />
        </div>
        <hr className="shareHr" />
        {file && (
            <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={()=>setFile(null)} /> 
            </div>
        )}
        <form className="shareBottom" onSubmit={handleSubmit} >
        <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
                <PermMedia htmlColor="tomato" className="shareIcons" />
                <span className="shareOptionText">Photo or Video</span>
                <input style={{display:"none"}} type="file" id="file" accept=".png,.jpg,.jpeg" onChange={(e)=> setFile(e.target.files[0])} />
            </label>
            <div className="shareOption">
                <Label htmlColor="blue" className="shareIcons" />
                <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
                <Room htmlColor="green" className="shareIcons" />
                <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
                <EmojiEmotions htmlColor="goldenrod" className="shareIcons" />
                <span className="shareOptionText">Feelings</span>
            </div>          
        </div>
        <button className="shareButton" type="submit" >Share</button>
        </form>
       </div>
       </div>
    )
}

export default Share; 
