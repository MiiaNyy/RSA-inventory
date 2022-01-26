const express = require("express");
const router = express.Router();

const {validateNewItemForm} = require("../middleware/formValidation");

const {item_details_get, item_details_post,} = require("../controlles/items/itemDetailsControllers");
const {create_item_get, create_item_post} = require("../controlles/items/createItemControllers");

router.post('/', validateNewItemForm, (req, res) => {
    create_item_post(req, res)
        .then(() => console.log('create item post'))
})

router.get('/create', (req, res) => {
    create_item_get(req, res)
        .then(() => console.log('create item get'))
})

router.get('/:id', (req, res) => {
    item_details_get(req, res)
        .then(() => console.log('item details get'))
})

// Delete button is pressed
router.post('/:id', (req, res) => {
    item_details_post(req, res)
        .then(() => console.log('item details post'))
})


module.exports = router;
