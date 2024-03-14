// create, get, get all by user id, get all by hotel id, delete/cancel
import Reservation from "../models/Reservation.js"

export const createReservation = async(req, res, next) => {
    const newRes = new Reservation(req.body);
    try {
        const savedRes = await newRes.save();
    }
    catch(err) {
        next(err);
    }
}