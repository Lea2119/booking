import "./navbar.css"
import {Link} from "react-router-dom"; 
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";


const Navbar = () => {
  const {user} = useContext(AuthContext); 
  const {dispatch} = useContext(AuthContext); 

  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    navigate("/");
  };
  
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Booking.com</span>
        </Link>
        {user ? (
          <div className="uLog">
            <Link to={"/users/update"}>
            <img className="uImg" src={user.img ? user.img : require("../../assets/user.png")} alt="User"/>
            </Link>
            <span className="greeting">Hello {user.username}</span>
            <button onClick={handleLogout} className="navButton">
              Logout
            </button>
          </div>
        ) : (
          <div className="navItems">
            <Link to={"/users/new"}>
            <button className="navButton">Register</button>
            </Link>
            <Link to={"/login"}>
            <button className="navButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;