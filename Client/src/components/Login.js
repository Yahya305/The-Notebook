import React,{useContext,useState} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import { NavLink } from "react-router-dom";
import "../styles/Login.scss"


function Login() {
  const navigate = useNavigate();
  const token= useContext(AuthContext);
  const [displayErrMsg, setDisplayErrMsg]= useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const creds = {};
    creds.email = event.target.email.value;
    creds.password = event.target.password.value;
    fetch("http://192.168.18.54:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    })
      .then(((res) => res.json(), (rej) => rej.json()))
      .then((res) => {
        console.log(res.success)
        if (res.error) {
          setDisplayErrMsg(true)
            console.log(res.error);
        } else {
            localStorage.setItem("token", res.token);
            token.updateToken(res.token);
            token.updateAuth(true);
            navigate("/");
            // alert(res.errors)
        }
      });
  };
  return (
    <>
    <div hidden={!displayErrMsg}>Please Login with the correct credentials</div>
      <form className="login-container" onSubmit={handleSubmit} action="/login" method="post" >
        <div className="creds">
        <h1>Login</h1>
        <div className="field">
        <label htmlFor="email">Email: &nbsp;</label>
        <input type="text" id="email" name="email" required />
        </div>
        <div className="field">
        <label htmlFor="password">Password: &nbsp;</label>
        <input type="password" id="password" name="password" required />
        </div>
        </div>
        <div className="login-btns">
        <button type="submit">Login</button>
        <button id="signup-btn">
      <NavLink to={"/signup"} style={{color:"white",textDecoration:"none"}} aria-current="page" href="/" >
            Signup
        </NavLink>
        </button>
        </div>
      </form>
    </>
  );
}

export default Login;
