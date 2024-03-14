import express from "express";
import {
  createReservation,
  getReservationsHotel,
  getReservationsUser,
  deleteReservation
} from "../controllers/reservation.js";

const router = express.Router();

router.post("/", createReservation);
router.put("/:id", deleteReservation);
router.get("/rest/:userId", getReservationsHotel);
router.get("/user/:hotelId", getReservationsUser);

export default router;