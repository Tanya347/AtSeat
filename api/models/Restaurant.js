import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema(
  {
    name: {
        type: 'String',
        required: true
    },
    address: {
        type: 'String',
        required: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    contact: {
        type: 'String',
        required: true
    }, 
    rating: {
        type: Number
    },
    slots: [
        {
            time: "string",
            unavailableDates: {type: [Date]}
        }
    ],

  },
  { timestamps: true }
);



export default mongoose.model("Restaurant", RestaurantSchema);