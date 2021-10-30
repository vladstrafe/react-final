const { Truck } = require('../models/truckModel');

const getTrucks = async (userId) => {
    let trucks;
    if(!userId) trucks = await Truck.find({})
    else {
        trucks = await Truck.find({created_by: userId})
    }
    return trucks;
}

const addTruck = async (userId, truckPayload) => {
    const truck = new Truck({created_by: userId, ...truckPayload});
    await truck.save();
}

const getTruckById = async (truckId) => {
    const truck = await Truck.findOne({_id: truckId})
    return truck
}

const assignTruck = async (truckId, userId) => {
    await Truck.findOneAndUpdate({_id: truckId}, {$set: {assigned_to: userId}})
}

const updateTruck = async (truckId, data) => {
    await Truck.findOneAndUpdate({_id: truckId}, {$set: data})
}

const deleteTruck = async (truckId) => {
    await Truck.findByIdAndDelete({_id: truckId})
}

module.exports = {
    getTrucks,
    addTruck,
    getTruckById,
    assignTruck,
    updateTruck,
    deleteTruck
};