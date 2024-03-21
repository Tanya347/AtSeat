import React, { useContext } from 'react'
import useFetch from '../useFetch'
import { AuthContext } from '../authContext'
import ReservationCard from '../components/ReservationCard'
import Navbar from '../components/Navbar'
import "../styles/reservation.scss"

const Reservations = () => {

  const { user } = useContext(AuthContext)
  
  const {data} = useFetch(`/reservations/user/${user._id}`)
  return (
    <div>
        <Navbar />
        <div className="reservation-container">
        {data ? (
          data.map((item, index) => (
            <ReservationCard key={index} props={item} />
          ))
        ) : (
          "No Reservations Yet"
        )}
        </div>
    </div>
  )
}

export default Reservations