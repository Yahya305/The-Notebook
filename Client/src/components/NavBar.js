import React, { useEffect, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../App";
import MenuIcon from "@mui/icons-material/Menu";

export default function NavBar() {
  const [showMenu, setShowMenu] = useState(false);

  const token = useContext(AuthContext);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleScroll() {
    const navbar = document.getElementById("navbar");
    if (window.pageYOffset > 40) {
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    token.updateToken();
  };

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };
  return (
    <>
      <div id="navbar" className="navbar">
        {/* <img className='bloglogo' src='150xpic.png' alt='unavailable'></img>  */}
        <img className="bloglogo" src="NBicn.ico" alt="unavailable"></img>
        {/* <div className='bloglogo'>Title</div>*/}
        <div className="navbar__bars" onClick={handleMenuClick}>
          {showMenu ? (
              token.token ? (
                <div className="ham-content">
                  <NavLink
                    to={"/"}
                    onClick={handleMenuClick}
                    style={({ isActive }) =>
                      isActive ? { color: "rgb(43,237,37)" } : null
                    }
                    aria-current="page"
                    className="ham-item"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to={"/notifications"}
                    onClick={handleMenuClick}
                    style={({ isActive }) =>
                      isActive ? { color: "rgb(43,237,37)"} : null
                    }
                    aria-current="page"
                    className="ham-item"
                  >
                    Notifications
                  </NavLink>
                  <NavLink
                    to={"/about"}
                    onClick={handleMenuClick}
                    style={({ isActive }) =>
                      isActive ? { color: "rgb(43,237,37)" } : null
                    }
                    aria-current="page"
                    href="/"
                    className="ham-item"
                  >
                    About
                  </NavLink>
                  <NavLink
                    to={"/imagelab"}
                    onClick={handleMenuClick}
                    style={({ isActive }) =>
                      isActive ? { color: "rgb(43,237,37)" } : null
                    }
                    aria-current="page"
                    href="/"
                    className="ham-item"
                  >
                    Image Lab
                  </NavLink>
                  <NavLink
                    onClick={handleLogout}
                    to={"/login"}
                    style={({ isActive }) =>
                      isActive ? { color: "rgb(43,237,37)" } : null
                    }
                    aria-current="page"
                    href="/"
                    className="ham-item"
                  >
                    Logout
                  </NavLink>
                </div>
              ) : (
                <div className="ham-content">
                  <NavLink
                    to={"/login"}
                    onClick={handleMenuClick}
                    style={({ isActive }) =>
                      isActive ? { color: "rgb(43,237,37)" } : null
                    }
                    aria-current="page"
                    href="/"
                    className="ham-item"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to={"/signup"}
                    style={({ isActive }) =>
                      isActive ? { color: "rgb(43,237,37)" } : null
                    }
                    aria-current="page"
                    href="/"
                    className="ham-item"
                  >
                    Signup
                  </NavLink>
                </div>
              )
          ) : (
            <MenuIcon />
          )}
        </div>
        <ul className="navbtns">
          {token.token ? (
            <>
              <NavLink
                to={"/"}
                style={({ isActive }) =>
                  isActive ? { color: "rgb(43,237,37)" } : null
                }
                aria-current="page"
                href="/"
                className="navitem"
              >
                Home
              </NavLink>
              <NavLink
                to={"/notifications"}
                style={({ isActive }) =>
                  isActive ? { color: "rgb(43,237,37)" } : null
                }
                aria-current="page"
                href="/"
                className="navitem"
              >
                Notifications
              </NavLink>
              <NavLink
                to={"/about"}
                style={({ isActive }) =>
                  isActive ? { color: "rgb(43,237,37)" } : null
                }
                aria-current="page"
                href="/"
                className="navitem"
              >
                About
              </NavLink>
              <NavLink
                to={"/imagelab"}
                style={({ isActive }) =>
                  isActive ? { color: "rgb(43,237,37)" } : null
                }
                aria-current="page"
                href="/"
                className="navitem"
              >
                Image Lab
              </NavLink>
              <NavLink
                onClick={handleLogout}
                to={"/login"}
                style={({ isActive }) =>
                  isActive ? { color: "rgb(43,237,37)" } : null
                }
                aria-current="page"
                href="/"
                className="navitem"
              >
                Logout
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to={"/login"}
                style={({ isActive }) =>
                  isActive ? { color: "rgb(43,237,37)" } : null
                }
                aria-current="page"
                href="/"
                className="navitem"
              >
                Login
              </NavLink>
              <NavLink
                to={"/signup"}
                style={({ isActive }) =>
                  isActive ? { color: "rgb(43,237,37)" } : null
                }
                aria-current="page"
                href="/"
                className="navitem"
              >
                Signup
              </NavLink>
            </>
          )}
        </ul>
      </div>
    </>
  );
}