const express = require("express");
const StuffedAnimal = require("../modules/stuffedAnimal");
const router = express.Router();

const animals = require("../helpers/speciesAndSizes").animals;
const sizes = require("../helpers/speciesAndSizes").sizes;

router.get('/', (req, res) => {
    StuffedAnimal.find({}).sort({createdAt: -1}).lean()
                 .then(result => {
                     res.render('index', {
                         title: "Rafael's stuffed animals",
                         info: {
                             title: 'Welcome to the stores inventory app',
                             text: 'Below you can browse all of the items in the current store inventory. You can' +
                                 ' also search specific items by category or price'
                         },
                         animals, sizes, items: result
                     })
                 })
                 .catch(e => console.log(e))
    
})

module.exports = router;