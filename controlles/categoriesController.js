const StuffedAnimal = require("../modules/stuffedAnimal");

const getPriceRange = require("../helpers/getPriceRange");
const getSidebarOptions = require("../helpers/getSidebarOptions");

function getCategoryObj (req) {
    return req.categoryName === 'Animal' ? req.itemCategories.breeds : req.categoryName === 'Size' ?
        req.itemCategories.sizes : req.categoryName === 'Price' ? req.itemCategories.prices : undefined;
}

// Page where single category is listed
function category_get (req, res) {
    try {
        
        res.render('categoryList', {
            title: `RSA - ${ req.categoryName }s`,
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
            title: "RSA - Categories",
            categories: req.itemCategories.all,
            currentUser: req.currentUser,
        })
    } catch (e) {
        console.log('Error happened:', e)
    }
}


async function animal_category_get (req, res) {
    try {
        const sidebarOptions = getSidebarOptions(req);
        const id = req.params.id;
        res.render('inventoryTable', {
            title: `RSA - Animals`,
            info: {title: `Animals: ${ id.toUpperCase() }`},
            items: await StuffedAnimal.find({animal: id}).sort({animal: 1}).lean(),
            ...sidebarOptions,
        })
    } catch (e) {
        console.log(e);
    }
}

async function price_category_get (req, res) {
    try {
        const id = req.params.id;
        const [minPrice, maxPrice] = getPriceRange(id);
        const sidebarOptions = getSidebarOptions(req);
    
        res.render('inventoryTable', {
            title: `RSA - Prices`,
            info:
                {title: `Category price: ${ id.toUpperCase() }`},
            items: await StuffedAnimal.find({price: {$gte: minPrice, $lte: maxPrice}}).sort({price: 1}).lean(),
            ...sidebarOptions,
        })
    } catch (e) {
        console.log(e);
    }
}

async function size_category_get (req, res) {
    try {
        const size = req.params.id;
        const sizeUpperCase = size.charAt(0).toUpperCase() + size.slice(1);
        const sidebarOptions = getSidebarOptions(req);
        res.render('inventoryTable', {
            title: `RSA - ${ sizeUpperCase }`,
            info: {title: `Size: ${ sizeUpperCase }`},
            items: await StuffedAnimal.find({size}).sort({createdAt: -1}).lean(),
            ...sidebarOptions,
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
