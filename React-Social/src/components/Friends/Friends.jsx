import "./Friends.css";

const Friends=({user}) =>{
    const PF=import.meta.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <>
            <li className="leftbarFriend">
     <img className="leftbarFriendImg" src={PF+user.profilePicture} alt="Friend Image" />
        <span className="leftbarFriendName">{user.username}</span>
    </li>
        </>
    )
}

export default Friends;