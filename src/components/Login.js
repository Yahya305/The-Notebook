import React,{useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import { NavLink } from "react-router-dom";



function Login() {
  const navigate = useNavigate();
  const token= useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const creds = {};
    creds.email = event.target.email.value;
    creds.password = event.target.password.value;
    fetch("http://localhost:5000/api/auth/login", {
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
    <div>
      <form onSubmit={handleSubmit} action="/login" method="post">
        <h1>Login</h1>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" required />
        <br />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />
        <br />
        <button type="submit">Login</button>
      </form>
      <NavLink to={"/signup"} style={({isActive})=>isActive? {color:"rgb(43,237,37)"}:null} aria-current="page" href="/" className='navitem' >
            Signup
        </NavLink>
    </div>
  );
}

export default Login;
