const express = require("express");
const router = express.Router();

const {validateNewItemForm} = require("../../middleware/formValidation");
const requireAuth = require("../../middleware/authMiddleware");

const {
    create_item_get,
    item_details_get,
    item_details_post,
    create_item_post
} = require("../../controlles/itemController");


router.post('/', validateNewItemForm(), (req, res) => {
    create_item_post(req, res)
        .then(() => console.log('create item post'))
})

router.get('/create', requireAuth, (req, res) => {
    create_item_get(req, res)
        .then(() => console.log('create item get'))
})

router.get('/:id', requireAuth, (req, res) => {
    item_details_get(req, res)
        .then(() => console.log('item details get'))
})

// Delete button is pressed
router.post('/:id', requireAuth, async (req, res) => {
    item_details_post(req, res)
        .then(() => console.log('item details post'))
})


module.exports = router;
