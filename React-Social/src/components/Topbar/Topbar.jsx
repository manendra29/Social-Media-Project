import "./Topbar.css";
import {Search ,Person,Chat,Notifications} from "@mui/icons-material"
import { useContext } from "react";
import { Link} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Topbar=() =>{
    const {user}=useContext(AuthContext);
    const PF=import.meta.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className="topbarContainer">
            <div className="topbarLeft" >
            <Link to="/" style={{textDecoration:"none"}}>
            <span className="logo" >Manendra</span>
            </Link>
              
            </div>

            <div className="topbarCentre" >
            <div className="searchbardiv">
                 <Search className="searchLogo"/>
                <input placeholder="Search for any post,user or video" className="searchbar" />
            </div>
               
            </div>

            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Home</span>
                    <span className="topbarLink">Timeliner</span>
                </div>
                <div className="topbarIcons">
                <div className="topbarIcon" >
                    <Person />
                    <span className="topbarBadge">1</span>
                </div>
                <div className="topbarIcon" >
                    <Chat />
                    <span className="topbarBadge">2</span>
                </div>
                <div className="topbarIcon" >
                    <Notifications />
                    <span className="topbarBadge">3</span>
                </div>
                </div>
                <Link to={`/profile/${user.username}`}>
                    <img className="topbarImg" src={user.profilePicture?PF+user.profilePicture : PF+"noPP.jpg"} />
                </Link>
                
            </div>
        </div>
    )
}

export default Topbar;