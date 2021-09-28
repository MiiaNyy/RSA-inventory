const express = require("express");
const router = express.Router();

const StuffedAnimal = require("../../modules/stuffedAnimal");

const {animals, sizes} = require("../../helpers/animalsAndSizes");

router.get('/', (req, res) => {
    res.send('<h1>Colors page</h1>')
});

router.post('/', (req, res) => {
    const targetClr = req.body.color;
    StuffedAnimal.find({color: targetClr}).lean()
                 .then(result => {
                     console.log(result);
                     if ( result.length <= 0 ) {
                         res.render('inventoryTable', {
                             title: `No matches found`,
                             info:
                                 {
                                     title: `Color ${ targetClr }`,
                                     text: 'No matches found with this color. Please try again.'
                                 },
                             animals,
                             sizes,
                             items: result
                         })
                     } else {
                         res.render('inventoryTable', {
                             title: `Category Color`,
                             info:
                                 {title: `Color ${ targetClr }`},
                             animals,
                             sizes,
                             items: result
                         })
                     }
                     //#df627c
                 })
                 .catch(e => console.log(e))
})


module.exports = router;