import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    roomNumbers: [{ number: Number, unvailableDates: { type: [Date] } }],
  },
  { timestamps: true }
  // Mongoose schemas support a timestamps option.
  // If you set timestamps: true, Mongoose will add two properties of type Date to your schema:
  // createdAt: a date representing when this document was created
  // updatedAt: a date representing when this document was last updated
);

export default mongoose.model("Room", RoomSchema);
