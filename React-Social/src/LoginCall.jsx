import axios from "axios";

export const LoginCall= async (userCredentials,dispatch)=>{
    console.log(userCredentials);
dispatch({type:"LOGIN_START"});
try {
    // console.log(res.data);
    const res= await axios.post("http://localhost:4000/api/auth/login",userCredentials);
        // console.log(res.data);
    dispatch({type:"LOGIN_SUCCESS",payload:res.data});
} catch (error) {
    dispatch({type:"LOGIN_FAILURE",payload:error});
}
}