import { Link } from "react-router-dom";

const Home =()=>{
    return(
        <>
            <div style={{color:"white", textAlign:"center"}}>
                 <h1>Home Component</h1>
                 <br/>
                 <Link to="/login" style={{color:"white"}} >Go back to Login</Link>
            </div>
        </>
    )
}

export default Home;