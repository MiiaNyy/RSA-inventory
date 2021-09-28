const express = require("express");
const StuffedAnimal = require("../../modules/stuffedAnimal");
const router = express.Router();

const animals = require("../../helpers/animalsAndSizes").animals;
const sizes = require("../../helpers/animalsAndSizes").sizes;

router.get('/details/:id', (req, res) => {
    const id = req.params.id;
    StuffedAnimal.findById(req.params.id).lean()
                 .then(result => {
                     console.log(result);
                     res.render('itemDetails', {
                         title: "Rafael's stuffed animals",
                         item: result,
                     })
                 })
                 .catch(e => console.log(e))
})

module.exports = router;