const express = require("express");
const StuffedAnimal = require("../modules/stuffedAnimal");
const router = express.Router();

router.get('/', (req, res) => {
    StuffedAnimal.find({}).sort({createdAt: -1}).lean()
                 .then(result => {
                     res.render('index', {title: "Rafael's stuffed animals", items: result})
                 })
                 .catch(e => console.log(e))
    
})

module.exports = router;