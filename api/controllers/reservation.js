// create, get all by user id, get all by hotel id, delete/cancel

import Reservation from "../models/Reservation.js"
import User from "../models/User.js"

export const createReservation = async(req, res, next) => {
    const newRes = new Reservation(req.body);
    try {
        const savedRes = await newRes.save();

        try {
            const user = await User.findById(savedRes.author);
            user.reservations.push(savedRes._id);
            await user.save();
        }

        catch(err) {
            next(err)
        }

        res.status(200).json(savedRes);
    }
    catch(err) {
        next(err);
    }
}

export const deleteReservation = async (req, res, next) => {
    try {
      await Reservation.findByIdAndDelete(req.params.id);
      
      try {

          await User.findOneAndUpdate(
            { reservations: req.params.id }, // Find the user who has the entry id in their reservations array
            { $pull: { reservations: req.params.id } }, // Remove the entry id from the reservations array
            { new: true }
          );
      }

      catch(err) {
        next(err)
      }
      
      res.status(200).json("the reservation has been deleted");
    } catch (err) {
      next(err);
    }
  };

  export const getReservationsUser = async (req, res, next) => {
    const userId = req.params.userId;
    try {
      const reservations = await Reservation.find({ author: userId })
      res.status(200).json(reservations);
    } catch (err) {
      next(err)
    }
  }

  export const getReservationsHotel = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    try {
      const reservations = await Reservation.find({ rest: hotelId })
      res.status(200).json(reservations);
    } catch (err) {
      next(err)
    }
  }