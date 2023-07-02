import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";


// CREATE A ROOM

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id }, // pushes new room into hotel finding hotel'id and finally update it. 
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

// UPDATE A ROOM

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateRoomAvailability  = async (req, res, next) => {
  try {
  await Room.updateOne(
  {"roomNumbers._id": req.params.id},
  {
    $push: {
      "roomNumbers.$.unvailableDates": req.body.dates,
    },
// "roomNumbers" is the target array field where the new elements will be added. It's using the positional operator $ to refer to the specific element in the array that matches the update condition.
  }
  );
    res.status(200).json("room updated");
  } catch (err) {
    next(err)
  }
};

// DELETE A ROOM

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
// This line extracts the value of the hotelid parameter from the request object (req) and assigns it to the hotelId constant.

  try {
    await Room.findByIdAndDelete(req.params.id);
// This line uses the Room model to find a room by its ID (req.params.id) and delete it from the database.
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
// This line uses the Hotel model to find a hotel by its ID (hotelId) and update it.
        $pull: { rooms: req.params.id },
// The $pull operator is used to remove the specified room ID (req.params.id) from the rooms array field of the hotel document.
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room has been deleted");
  } catch (err) {
    next(err);
  }
};

// GET A ROOM

export const getRoom = async (req, res) => {
  // Logic to fecth all rooms from the database
  try {
    // Send the response back to the client
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET ALL ROOMS

export const getAllRoom = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
