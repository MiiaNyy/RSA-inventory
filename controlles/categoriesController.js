const StuffedAnimal = require("../modules/stuffedAnimal");

const getSidebarOptions = require("../helpers/getSidebarOptions");
const {getCategoryObj, firstLetterToUpper, getPriceRange} = require("../helpers/categoryControllerHelpers");

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
        const animal = req.params.id;
        
        const sidebarOptions = getSidebarOptions(req);
        const animalToUpper = firstLetterToUpper(animal);
        
        res.render('inventoryTable', {
            title: `RSA - ${ animalToUpper }`,
            info: {title: `Animals: ${ animalToUpper }`},
            items: await StuffedAnimal.find({animal: animal}).sort({animal: 1}).lean(),
            ...sidebarOptions,
        })
    } catch (e) {
        console.log(e);
    }
}

async function price_category_get (req, res) {
    try {
        const price = req.params.id;
        const sidebarOptions = getSidebarOptions(req);
        
        const [minPrice, maxPrice] = getPriceRange(price);
        const priceToUpper = firstLetterToUpper(price);
        
        res.render('inventoryTable', {
            title: `RSA - ${ priceToUpper }`,
            info: {title: `Price: ${ priceToUpper }`},
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
        
        const sizeUpperCase = firstLetterToUpper(size);
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
