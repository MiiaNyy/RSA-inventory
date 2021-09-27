const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stuffedAnimalSchema = new Schema({
    color: {
        type: String,
        required: true,
    },
    animal: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    numberInStock: {
        type: Number,
        required: true,
    }
    
}, {timestamps: true});

const StuffedAnimal = mongoose.model("StuffedAnimal", stuffedAnimalSchema);

module.exports = StuffedAnimal;