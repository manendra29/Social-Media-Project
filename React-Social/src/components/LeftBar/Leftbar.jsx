import "./Leftbar.css";
import {RssFeed ,Chat ,PlayCircleFilled,Group,Bookmark,QuestionAnswer,WorkOutline,Event,School} from "@mui/icons-material"
import { Users} from "../../dummyData.js";
import Friends from "../Friends/Friends.jsx";
const Leftbar =() =>{
  const PF=import.meta.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className="leftbar">
        <div className="leftbarIcons">
        <ul className="leftbarList">
            <li className="leftbarIcon">
                <RssFeed className="Icons" />
                <span className="leftbarIconName">Feed</span>
            </li>
            <li className="leftbarIcon">
        <Chat className="Icons" />
<span className="leftbarIconName">Chats</span>
</li>
 <li className="leftbarIcon">
<PlayCircleFilled className="Icons" />
<span className="leftbarIconName">Videos</span>
</li>
 <li className="leftbarIcon">
<Group className="Icons" />
<span className="leftbarIconName">Groups</span>
</li>
 <li className="leftbarIcon">
<Bookmark className="Icons" />
<span className="leftbarIconName">Bookmarks</span>
</li>
 <li className="leftbarIcon">
<QuestionAnswer className="Icons" />
<span className="leftbarIconName">Questions</span>
</li>
 <li className="leftbarIcon">
<WorkOutline className="Icons" />
<span className="leftbarIconName">Jobs</span>
</li>
 <li className="leftbarIcon">
<Event className="Icons" />
<span className="leftbarIconName">Events</span>
</li>
 <li className="leftbarIcon">
<School className="Icons" />
<span className="leftbarIconName">Courses</span>
</li>
  </ul>
  <button className="leftbarButton">Show More</button>
  <hr className="leftbarHr"/>
  <ul className="leftbarFriendList">
    {Users.map( (u) =>(
      <Friends key={u.id} user={u} />
    ))}
    
  </ul>
        </div>
        </div>
    )
}
export default Leftbar;