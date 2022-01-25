const StuffedAnimal = require("../modules/stuffedAnimal");

const getPriceRange = require("../helpers/getPriceRange");

function getCategoryObj (req) {
    return req.categoryName === 'breed' ? req.itemCategories.breeds : req.categoryName === 'size' ?
        req.itemCategories.sizes : req.categoryName === 'price' ? req.itemCategories.prices : undefined;
}

// Page where single category is listed
function category_get (req, res) {
    try {
        
        res.render('categoryList', {
            title: "RSA - inventory",
            category: getCategoryObj(req),
            currentUser: req.currentUser,
        })
    } catch (e) {
        console.log('Error happened:', e)
    }
}

function categories_get (req, res) {
    try {
        res.render('allCategories', {
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
    category_get,
}
