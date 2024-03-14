import React, { useContext, useState } from "react";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from '../components/Navbar'
import axios from "axios";
import { AuthContext } from "../authContext";
import { useNavigate } from "react-router-dom";
import { slots } from "../data";
import "../styles/adminLanding.scss"

const AdminLanding = () => {

  const [files, setFiles] = useState([]);
  const [info, setInfo] = useState({});
  const [rating, setRating] = useState(0);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dmjd7myiw/image/upload",
            data, { withcredentials: false }
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const newpost = {
        ...info,
        admin: user._id,
        photos: list,
        rating: rating,
        slots: slots
      };

      await axios.post("http://localhost:7700/api/restaurants", newpost)

      navigate("/explore");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="createRestContainer">
        <Navbar />
        <div className="cpContainer">
        <div className="formContainer">

          <div className="picsContainer">

            <div className="formInput">
              <h2>Upload Images (Max 6)</h2>
              <label htmlFor="file">
                <FontAwesomeIcon className="icon" icon={faPlusCircle} />
              </label>
              <input
                type="file"
                id="file"
                multiple
                onChange={(e) => setFiles(Array.from(e.target.files))}
                style={{ display: "none" }}
              />
            </div>
            <div className="uploadedPictures">
              
              {files?.map((file, index) => (
                <div className="upload_pic" key={index}>
                  <img
                    src={URL.createObjectURL(file)}
                    alt=""
                    height="80px"
                  />
                </div>
              ))}
            </div>

          </div>

          <div className="inputContainer">

                <div className="input">
                  <label htmlFor="title">Name</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="name"
                    placeholder="Enter Name"
                  />
                </div>

                <div className="input">
                  <label htmlFor="location">Location</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="location"
                    placeholder="Enter location"
                  />
                </div>

                <div className="input">
                  <label htmlFor="price">Price Range</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="price"
                    placeholder="Enter price range"
                  />
                </div>

                <div className="input">
                  <label htmlFor="date">Contact Information</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="contact"
                    placeholder="Enter the information"
                  />
                </div>

                <div className="input">
                  <div className="star-rating-slider">
                    Rating: 
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FontAwesomeIcon
                        key={star}
                        icon={star <= rating ? solidStar : regularStar}
                        className={"star-icon"}
                        onClick={() => handleStarClick(star)}
                      />
                    ))}
                  </div>
                </div>

            <div className="input">
              <label htmlFor="desc">Description</label>
              <input
                onChange={handleChange}
                type="text"
                id="description"
                placeholder="A brief description"
              />
            </div>

            <button className="button" onClick={handleClick} type="submit">
              Create Restaurant
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AdminLanding