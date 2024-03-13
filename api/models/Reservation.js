import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema(
  {
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String
    },
    people: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    rest: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    }
  },
  { timestamps: true }
);



export default mongoose.model("Reservation", ReservationSchema);