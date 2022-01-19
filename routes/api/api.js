const express = require("express");
const router = express.Router();

const {validateNewItemForm} = require("../../middleware/formValidation")
const {
    api_item_post,
    api_item_delete,
    api_item_get
} = require("../../controlles/apiController");

router.post('/', validateNewItemForm(), async (req, res) => {
    api_item_post(req, res);
})

router.post('/delete/:id', async (req, res) => {
    api_item_delete(req, res);
})

router.get('/:id', async (req, res) => {
    api_item_get(req, res);
})

module.exports = router;
