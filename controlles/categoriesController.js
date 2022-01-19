const StuffedAnimal = require("../modules/stuffedAnimal");

const getPriceRange = require("../helpers/getPriceRange");

async function categories_get (req, res) {
    try {
        res.render('categories', {
            title: "Categories",
            categories: req.itemCategories.all,
            currentUser: req.currentUser,
        })
    } catch (e) {
        console.log('Error happened:', e)
    }
}

async function animal_category_get (req, res) {
    try {
        const id = req.params.id;
        res.render('inventoryTable', {
            title: `Animals`,
            info: {title: `Animals: ${ id.toUpperCase() }`},
            categories: req.itemCategories.all,
            items: await StuffedAnimal.find({animal: id}).sort({animal: 1}).lean(),
            sidebarIsNeeded: true,
            moveElementToRight: 'margin-left',
            currentUser: req.currentUser,
        })
    } catch (e) {
        console.log(e);
    }
}

async function price_category_get (req, res) {
    try {
        const id = req.params.id;
        const [minPrice, maxPrice] = getPriceRange(id);
        
        res.render('inventoryTable', {
            title: `Category price`,
            info:
                {title: `Category price: ${ id.toUpperCase() }`},
            items: await StuffedAnimal.find({price: {$gte: minPrice, $lte: maxPrice}}).sort({price: 1}).lean(),
            sidebarIsNeeded: true,
            moveElementToRight: 'margin-left',
            categories: req.itemCategories.all,
            currentUser: req.currentUser,
        })
    } catch (e) {
        console.log(e);
    }
}

async function size_category_get (req, res) {
    try {
        const size = req.params.id;
        
        res.render('inventoryTable', {
            title: `Sizes`,
            info:
                {title: `Size: ${ size.toUpperCase() }`},
            items: await StuffedAnimal.find({size}).sort({createdAt: -1}).lean(),
            sidebarIsNeeded: true,
            moveElementToRight: 'margin-left',
            currentUser: req.currentUser,
            categories: req.itemCategories.all,
        })
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    categories_get,
    animal_category_get,
    price_category_get,
    size_category_get,
}
