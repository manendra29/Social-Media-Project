import Leftbar from "../../components/LeftBar/Leftbar";
import Topbar from "../../components/Topbar/Topbar";
import Feed from "../../components/Feed/Feed";
import "./Home.css"
import Rightbar from "../../components/RightBar/Rightbar";

const Home= () =>{

    return (
        <>
        <Topbar />
        <div className="HomeContainer">
        <Leftbar />
        <Feed />
        <Rightbar />
        </div>
        </>
    )
}

export default Home;