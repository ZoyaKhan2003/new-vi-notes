import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const Login = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword]= useState("");
    const navigate = useNavigate();
    const API = import.meta.env.VITE_API_URL;

    const handleLogin = async () =>{
    try {
    const res = await axios.post(`${API}/api/auth/login`, {
      email,
      password,
    });
    localStorage.setItem("token", res.data.token);

    alert(res.data.msg); // success
    navigate("/home");
  } catch (err: any) {
    console.log("Error:", err);
    alert(err.response?.data?.msg); 
  }
    }

     const handleGoogle = async (credentialResponse: any) => {
      
    try {
      const res = await axios.post(
        `${API}/api/auth/google`,
        {
          token: credentialResponse.credential,
        }
      );
 localStorage.setItem("token", res.data.token);

      alert(res.data.msg);
      navigate("/home");
    } catch {
      alert("Google login failed");
    }
  };

    return(
        <>
           
            <div className="formstyle">
               <div style={{textAlign:"center"}}><h2>Login</h2></div>
                <label>Email : </label>
                <input onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
                <label>Password : </label>
                <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
                <button onClick={handleLogin}>Login</button>

              <div className="google-btn">
                <GoogleLogin
                    onSuccess={handleGoogle}
                    onError={() => console.log("Error")}
                      theme="outline"   
                      shape="pill"      
                      text="signin_with"
                  />
              </div>

                <div style={{textAlign:"center"}}><p>Do not have an account? </p> <Link to="/register">Register</Link></div>
           </div>
        </>
    )
}

export default Login;