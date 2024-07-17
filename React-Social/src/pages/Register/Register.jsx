import { useRef } from "react";
import {useNavigate} from "react-router-dom"
import "./Register.css";
import axios from "axios";

const Register =() =>{
    const username=useRef();
    const email=useRef();
    const password=useRef();
    const passwordAgain=useRef();
    const navigate=useNavigate();

    const handleClick= async(e) =>{
        e.preventDefault();

        if(password.current.value !== passwordAgain.current.value){
            passwordAgain.current.setCustomValidity("Password Doesn't Match");
        }
        else{
            const user={
                username:username.current.value,
                email:email.current.value,
                password:password.current.value
            }
            try {
                 await axios.post("http://localhost:4000/api/auth/register",user);
            navigate("/login");
            } catch (error) {
                console.log(error);
            }   
        }
    }

    return (
        <div className="login">
            <div className="loginWrapper">
            <div className="loginLeft">
            <h3 className="loginLogo">Manendra</h3>
            <span className="loginDesc">Connect With your Friends and the World around you!</span>
            </div>
            <div className="loginRight" onSubmit={handleClick}>
                <form className="loginBox">
                    <input className="loginInput" ref={username} placeholder="username" />
                    <input className="loginInput" type="email" ref={email} placeholder="Email" />
                    <input className="loginInput" type="password" ref={password} placeholder="password" />
                    <input className="loginInput" type="password" ref={passwordAgain} placeholder="password again" />
                    <button className="loginButton" type="submit">Sign Up</button>
                    <button className="loginRegisterButton">Login into Account?</button>
                </form>
            </div>
            </div>
        </div>
    )
}

export default Register;