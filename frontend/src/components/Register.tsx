import {  useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    const res = await axios.post("http://localhost:5000/api/auth/register", {
      email,
      password,
    });
    alert(res.data.msg);
  };

   const handleGoogle = async (credentialResponse: any) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/google",
        {
          token: credentialResponse.credential,
        }
      );
      alert(res.data.msg);
      navigate("/home");
    } catch {
      alert("Google login failed");
    }
  };

  return (
    <div className="formstyle">
      <div style={{textAlign:"center"}}><h2>Register</h2></div>
      <label>Email : </label>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <label>Password : </label>
      <input type="password" placeholder="Password"
        onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>

      <div className="google-btn">
                <GoogleLogin
                    onSuccess={handleGoogle}
                    onError={() => console.log("Error")}
                      theme="outline"   
                      shape="pill"      
                      text="signin_with"
                  />
              </div>

     <div style={{textAlign:"center"}}><p>Already registered? </p> <Link to="/login">Login</Link></div> 
    </div>
  );
};

export default Register;
