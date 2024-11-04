import mongoose from "mongoose";
const TimeSlotSchema = new mongoose.Schema(
  {
    time: {
      type: Date,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    booked: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    timeSlots: [TimeSlotSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Movie", MovieSchema);
