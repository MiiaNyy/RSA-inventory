const StuffedAnimal = require("../modules/stuffedAnimal");
const getSidebarOptions = require("../helpers/getSidebarOptions");

async function homepage_get(req, res) {
    try {
        const sidebarOptions = getSidebarOptions(req);
        res.render('inventoryTable', {
            title: "RSA - Inventory",
            info: {
                title: "Welcome to Rafael's inventory.",
                text: 'Below you can browse all of the items in the store inventory. Click specific item to know' +
                    ' more information about it.',
                text2: ' If you like to create new or delete current items, please login first!'
            },
            items: await StuffedAnimal.find({}).sort({createdAt: -1}).lean(),
            query: req.query,
            ...sidebarOptions,
        })
    } catch (e) {
        console.log('Error happened during category and inventory fetching:', e);
    }
}

module.exports = homepage_get;
