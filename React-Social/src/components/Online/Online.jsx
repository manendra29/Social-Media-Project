import "./Online.css";

const Online=({user}) =>{
    const PF=import.meta.env.REACT_APP_PUBLIC_FOLDER;
    return(
<>
<li className="rightbarFriend">
                        <div className="rightbarProfileImgContainer">
                            <img className="rightbarProfileImg" src={PF+user.profilePicture} alt="friend" />
                            <span className="rightbarOnline"></span>
                        </div>
                        <span className="rightbarUsername">{user.username}</span>
                    </li>
</>
    )
}

export default Online;