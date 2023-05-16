import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../App';



function Signup() {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const token = useContext(AuthContext);



  function handleSubmit(event) {
    event.preventDefault();
    try {
      const creds = {};
      creds.firstName = event.target.firstname.value;
      creds.lastName = event.target.lastname.value;
      creds.email = event.target.email.value;
      if (
        !creds.email ||
        !creds.firstName ||
        !creds.lastName ||
        !event.target.password.value ||
        !event.target.cpassword.value
      ) {
        throw new Error("Please Fill in all Fields");
      }
      if (event.target.cpassword.value !== event.target.password.value) {
        throw new Error("Passwords do not match");
      }
      creds.password = event.target.cpassword.value;

      console.log(creds)

      fetch("http://localhost:5000/api/auth/Sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(creds),
      })
        .then(((res) => res.json(), (rej) => rej.json()))
        .then((res) => {
          if (res.error) {
            console.log(res.error);
          } else {
            console.log(res);
            localStorage.setItem("token", res.token)
            token.updateToken(res.token);
            token.updateAuth(true);
            navigate("/");
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign up</h1>
      <label htmlFor="firstname">Firstname:</label>
      <input
        type="text"
        id="firstname"
        name="firstname"
        value={firstname}
        onChange={(event) => setfirstname(event.target.value)}
        required
      />
      <br />
      <label htmlFor="lastname">Lastname:</label>
      <input
        type="text"
        id="lastname"
        name="lastname"
        value={lastname}
        onChange={(event) => setlastname(event.target.value)}
        required
      />
      <br />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <br />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      <br />
      <label htmlFor="confirm-password">Confirm Password:</label>
      <input
        type="password"
        id="confirm-password"
        name="cpassword"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        required
      />
      <br />
      <button type="submit">Sign up</button>
    </form>
  );
}

export default Signup;
