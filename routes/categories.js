const express = require("express");
const StuffedAnimal = require("../modules/stuffedAnimal");
const router = express.Router();

const animals = require("../helpers/speciesAndSizes").animals;
const sizes = require("../helpers/speciesAndSizes").sizes;


router.get('/', (req, res) => {
    res.render('categories', {title: "Categories", animals, sizes})
    
})

module.exports = router;