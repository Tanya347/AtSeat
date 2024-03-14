import React,  { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import useFetch from '../useFetch'
import {
  faMoneyBill,
  faLocationDot,
  faThumbsUp,
  faCircleArrowLeft,
  faCircleArrowRight,
  faPhone
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/restaurant.scss"
import { slots } from '../data';
import axios from 'axios'
import { AuthContext } from '../authContext';

const Restaurant = () => {

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const {data} = useFetch(`/restaurants/${id}`);

  const [slideNumber, setSlideNumber] = useState(0);

  const handleMove = (direction) => {
    let newSlideNumber;
    let size = data.photos.length
    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? size - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === size - 1 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber)
  }

  const { user } = useContext(AuthContext);
  const [info, setInfo] = useState({});

  // set the usestate to the data user passed 
  const handleChange = (e) => {
      setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  // post the usestate to database
  const handleClick = async (e) => {
    e.preventDefault();

    const newRes = {
        ...info, author: user._id, rest: id
    }
    try {
        await axios.post("http://localhost:7700/api/reservations", newRes, {
            withCredentials: false
        })

        window.location.reload();

    }
    catch (err) {
        console.log(err)
    }
}

  return (
    <div className='restaurant'>
      <Navbar />
      <div className="rest-container">
        <div className="leftContainer">
          <h1>{data.name}</h1>
          <p>{data.description}</p>
          <div className="other-details">
            <div className="location"><span><FontAwesomeIcon icon={faLocationDot} /> Location:  </span>{data.location}</div>
            <div className="rating"><span><FontAwesomeIcon icon={faThumbsUp} /> Rating:  </span>{data.rating}</div>
            <div className="price"><span><FontAwesomeIcon icon={faMoneyBill} /> Price Range:  </span>{data.price}</div>
            <div className="contact"><span><FontAwesomeIcon icon={faPhone} /> Contact:  </span>{data.contact}</div>
          </div>
          <div className="reservation-box">
              <div className="form-input">
                <label htmlFor="date">Date</label>
                <input type="date" onChange={handleChange} id='date'/>
              </div>
              <div className="form-input">
                <label htmlFor="slots">Time</label>
                <select id="slots" onChange={handleChange}>
                  <option key={0} value="none">-</option> 
                  {
                    slots.map((s, index) => (
                      <option key={index} value={s.time}>{s.time}</option>
                    ))
                  }
                </select>
              </div>
              <div className="form-input">
                <label htmlFor="people">People</label>
                <input type="number" id='people' onChange={handleChange}/>
              </div>
              <button onClick={handleClick}>Make Reservation</button>
          </div>
        </div>
        <div className="rightContainer">
          <div className="imgSlider">
            {data.photos ? (<div className="images">
              <img src={data.photos[slideNumber]} height="300px" alt="" />

              {data.photos.length > 1 ? <div className="arrows">
                <FontAwesomeIcon
                  icon={faCircleArrowLeft}
                  className="arrow"
                  onClick={() => handleMove("l")}
                />
                <FontAwesomeIcon
                  icon={faCircleArrowRight}
                  className="arrow"
                  onClick={() => handleMove("r")}
                />
              </div> : ""}
              </div>) 
              : 
            ("no Images")}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Restaurant