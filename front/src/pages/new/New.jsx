import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaFolderPlus } from 'react-icons/fa';
import Navbar from "../../components/navbar/Navbar";

import "../new/new.css"; // Assuming this is the correct path to your CSS file

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!file) {
      console.log("No file selected");
      return;
    }
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post(
        "https://back.cloudinary.com/v1_1/ddfkz42vp/image/upload",
        data
      );

      const { url } = uploadRes.data;

      const newUser = {
        ...info,
        img: url,
      };

      await axios.post("https://booking-app-ag0s.onrender.com/back/auth/register", newUser);
      setShowMessage(true);
      setTimeout(() => {
        navigate("/"); // Redirect to the home page after a delay
      }, 2000); // Delay in milliseconds (2 seconds)
    } catch (err) {
      console.log(err.message);
    }
  };

  console.log(info);

  return (
    <div className="new">
      <Navbar />
      <div className="newContainer">
        <div className="bannerNew">
          <h2>{title}</h2>
        </div>
        <div className="bottomNew">
          <div className="uploadNew">
            {showMessage && (
              <div className="message">Account created! You can now log in.</div>
            )}
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : require("../../assets/user.png").default
              }
              alt=""
            />
            <label htmlFor="file">
              <FaFolderPlus className="icon" style={{ width: "24px", height: "24px", color: "#003B95" }} />
            </label>
          </div>

          <div className="formNew">
            <form>
              <div className="formInputNew">
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInputNew" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}
              <button className="sButton" onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
