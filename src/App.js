import "./App.css";
import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Notifications from "./components/Notifications";
import About from "./components/About";
import Errorpage from "./components/Errorpage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Imagelab from "./components/Imagelab";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CreateBlog from "./components/Modals/CreateBlog";
import ViewBlog from "./components/ViewBlog";

const AuthContext = React.createContext();
function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [readBlog, setReadBlog] = useState();

  const updateToken = (token) => {
    setToken(token);
  };

  const updateAuth = (bool) => {
    setIsAuthenticated(bool);
  };
  useEffect(() => {
    console.log(token, "app.js");

    if (token) {
      fetch("http://localhost:5000/api/auth/getuser", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      })
        .then(((res) => res.json(), (rej) => rej.json()))
        .then((res) => {
          if (res.error) {
            console.log(res.error);
            setIsAuthenticated(false);
          } else {
            console.log(res, "GET user");
            setIsAuthenticated(true);
          }
        });
    } else {
      setIsAuthenticated(false);
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AuthContext.Provider
      value={{ token, updateToken, isAuthenticated, updateAuth,readBlog,setReadBlog }}
    >
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/notifications"
            element={<Notifications />}
            strict={true}
            sensitive={true}
          >
            <Route
              path="/notifications/friends"
              element={<div>Sup! boii</div>}
            />
            <Route path="/notifications/fam" element={<div>we are fam</div>} />
          </Route>
          <Route path="/createblog" element={<CreateBlog/>} />
          <Route path="/viewblog" element={<ViewBlog/>} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/imagelab" element={<Imagelab />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
export { AuthContext };
