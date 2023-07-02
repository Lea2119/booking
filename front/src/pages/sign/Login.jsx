import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./login.css";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import userImage from "../../assets/user.png";

const Login = ({ inputs, title }) => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:8080/back/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="new">
      <Navbar />
      <div className="newContainer">
        <div className="top">
          <h3>Login or create an account</h3>
        </div>
        <div className="bottom">
          <img src={userImage} alt="" />
          <form>
            <div className="formInput">
              <input
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
                className="lInput"
              ></input>
              <input
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
                className="lInput"
              ></input>
            </div>

            <button className="fButton" onClick={handleClick}>
              Login
            </button>
            {error && <span>{error.message}</span>}
            <div className="registerContainer">
              <hr />
              <span>or</span>
              <hr />
            </div>
            <Link to={"/users/new"}>
              <button className="fButton">Create account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
