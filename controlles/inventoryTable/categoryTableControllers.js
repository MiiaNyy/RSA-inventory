// Inventory table page when user wants to see only item from specific category

const getSidebarOptions = require("../../helpers/getSidebarOptions");
const {firstLetterToUpper, getPriceRange} = require("../../helpers/categoryControllerHelpers");

const StuffedAnimal = require("../../modules/stuffedAnimal");

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
    animal_category_get,
    price_category_get,
    size_category_get,
}
