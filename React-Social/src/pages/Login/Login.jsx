import { AuthContext } from "../../context/AuthContext.jsx";
import { LoginCall } from "../../LoginCall.jsx";
import "./Login.css";
import CircularProgress from '@mui/material/CircularProgress';
import { useContext, useRef } from "react";
const Login =() =>{
    const email=useRef();
    const password=useRef();
    const {user,isFetching,error,dispatch}=useContext(AuthContext);
    const handleClick = async (e) => {
        e.preventDefault();
        // console.log("heyy bro..");
        // console.log(dispatch.type);
        // console.log(password.current.value);
        await LoginCall({email : email.current.value, password: password.current.value},dispatch);
        // console.log(user);
    }
    return (
        
        <div className="login">
            <div className="loginWrapper">
            <div className="loginLeft">
            <h3 className="loginLogo">Manendra</h3>
            <span className="loginDesc">Connect With your Friends and the World around you!</span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input className="loginInput" type="email" required placeholder="Email" 
                         ref={email}  />
                    <input className="loginInput" type="password" required placeholder="password" minLength="6" ref={password} />
                    
                    <button   className="loginButton" disabled={isFetching} >{isFetching ? <CircularProgress style={{color:"white", }}/>: "Log In"}</button>
                    <span className="loginForgot">Forget Password?</span>
                    <button type="submit" className="loginRegisterButton">Create a new Account?</button>
                </form>
            </div>
            </div>
        </div>
    )
}

export default Login;