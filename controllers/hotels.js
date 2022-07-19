const Hotel = require("../models/Hotel");

 
//create  
const createHotel = async (req, res, next)=>{
    const newHotel = new Hotel(req.body)
    try{
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel);
    }
    catch(err){
        next(err)
    }
}

//update  
const updateHotel = async (req, res, next)=>{
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updatedHotel);
    }
    catch(err){
        next(err)
    }
}

//delete  
const deleteHotel = async (req, res, next)=>{
    try{
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json('hotel has been deleted');
    }
    catch(err){
        next(err)
    }
}

//hotel details  
const hotelDetails = async (req, res, next)=>{
    try{
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel);
    }
    catch(err){
        next(err)
    }
}

//all details  
const allHotels = async (req, res, next)=>{
    const {min, max, ...others} = req.query;
    try{
        const hotels = await Hotel.find({
            ...others,
            cheapestPrice: {$gt: min || 1, $lt: max || 999},
        }).limit(req.query.limit)

        res.status(200).json(hotels);
    }
    catch(err){
        next(err)
    }
}

const allHotelsByCity = async (req, res, next)=>{
    const cities = req.query.cities.split(",")
    try{
        const list = await Promise.all(cities.map(city=>{    //Promise used for multiple data
            return Hotel.countDocuments({city:city})          //countDocuments used for geting length too shortly,, best practice to geting length
        }))
        res.status(200).json(list);
    }
    catch(err){
        next(err)
    }
}

const allHotelsByType = async (req, res, next)=>{
    try{
        const hotelCount = await Hotel.countDocuments({type:"hotel"})
        const apartmentCount = await Hotel.countDocuments({type:"apartment"})
        const resortCount = await Hotel.countDocuments({type:"resort"})
        const villaCount = await Hotel.countDocuments({type:"villa"})
        const cabinCount = await Hotel.countDocuments({type:"cabin"})
        
        res.status(200).json([
            {type:"hotel", count: hotelCount},
            {type:"apartments", count: apartmentCount},
            {type:"resorts", count: resortCount},
            {type:"villas", count: villaCount},
            {type:"cabins", count: cabinCount},
        ]);
    }
    catch(err){
        next(err)
    }
}

module.exports = {
    createHotel,
    updateHotel,
    deleteHotel,
    hotelDetails,
    allHotels,
    allHotelsByCity,
    allHotelsByType,
}