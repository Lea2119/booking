// Controllers (or handlers) are responsible for handling the logic of a specific route.
// They receive the request, process it, interact with the database
// perform business logic operations, and generate an appropriate response.

import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";


// CREATE HOTEL

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  // In this line, a new instance of the Hotel model is created using the new keyword.
  // It takes the data from the request body (req.body) and initializes the newHotel object.
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
    // If the hotel is successfully saved, a response with a status code of 200 (indicating success) is sent back to the client.
    // The json() method is used to send the saved hotel object as a JSON response.
  } catch (err) {
    next(err);
  }
};

// UPDATE HOTEL

export const updateHotel = async (req, res) => {
  try {                                                  // try block is the main logic of the function, where the hotel update operation takes place.
    const updatedHotel = await Hotel.findByIdAndUpdate(  // await keyword to wait for promises to be resolved.
      req.params.id,                             
      { $set: req.body },                                //  is the update object. It uses the $set operator to replace the value of the fields of the hotel document with the values from req.body.
      { new: true }                                      //  is an option that tells findByIdAndUpdate to return the updated document after the update operation is performed.
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE HOTEL

export const deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("hotel has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET HOTEL

export const getHotel = async (req, res) => {
  // Logic to fecth hotel with its id from the database
  try {
    // Send the response back to the client
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET ALL HOTELS

export const getAllHotel = async (req, res, next) => {
  const {min, max, ...others} = req.query;
  // Logic to fecth all hotels from the database
  try {
    const hotels = await Hotel.find({ ...others, cheapestPrice: { $gt: min | 1, $lt: max || 999} }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {  
    next(err); 
  }
};

// GET ALL HOTELS BY CITY

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

// GET ALL HOTELS BY TYPE

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotels", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try{
    const hotel = await Hotel.findById(req.params.id)
    const list = await Promise.all(hotel.rooms.map(room => { // Promise.all() takes an array of promises as its argument. In this case, the array of promises is generated using the .map() function, where each promise corresponds to the retrieval of a room document by ID.
      return Room.findById(room)
    })
    ); 
    res.status(200).json(list)
  } catch(err) {
    next(err)
  }
}
