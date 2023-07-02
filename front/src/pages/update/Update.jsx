import React, { useContext, useState } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";
import { FaFolderPlus } from 'react-icons/fa';
import "./update.css";

const Update = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [errorMessage, setErrorMessage] = useState(""); // New state variable
  const { user } = useContext(AuthContext);
  const id = user._id; 
  const updateUrl = `https://booking-app-ag0s.onrender.com/back/users/${id}`;
  console.log(updateUrl);


  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
  
    const data = new FormData();

  
    if (info.password === user.password) {
      setErrorMessage("Please enter a different password.");
      return;
    }

    setErrorMessage(""); 

    if (file) {
      data.append("file", file);
      data.append("upload_preset", "upload");
  
      try {
        const uploadRes = await axios.put(
          "https://back.cloudinary.com/v1_1/ddfkz42vp/image/upload",
          data
        );
    
        const { url } = uploadRes.data;
    
        setInfo((prev) => ({ ...prev, img: url }));
      } catch (err) {
        console.log(err.message);
      }
    }
  
    try {
      await axios.put(`/users/${id}`, info);
    } catch (err) {
      setErrorMessage("An error occurred while updating user data."); 
      console.log(err.message);
    }
  };
  
  

  console.log(info);

  return (
    <div className="new">
      <Navbar />
      <div className="newContainer">
        <div className="top">
          <h3>{title}</h3>
        </div>
        <div className="updateBottom">
          <div className="wrapperBottom">
            <div className="wrapperImage">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : user.img || require("../../assets/user.png")
              }
              alt="User"
            />
              <label htmlFor="file">
                <FaFolderPlus className="icon" style={{ width: "24px", height:"24px", color:"#003B95" }} />
                </label>
                </div>
            <form>
              <div className="formInput">
                <label htmlFor="file"></label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <input
                    className="input"
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}
              {errorMessage && <div className="error">Please choose a different password</div>} 
              <button className="uButton" onClick={handleClick}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
