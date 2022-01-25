function getCategoryObj (req) {
    return req.categoryName === 'Animal' ? req.itemCategories.breeds : req.categoryName === 'Size' ?
        req.itemCategories.sizes : req.categoryName === 'Price' ? req.itemCategories.prices : undefined;
}

function firstLetterToUpper (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

function getPriceRange (query) {
    switch (query) {
        case 'budget':
            return [0, 20];
        case 'medium':
            return [21, 50];
        case 'high':
            return [51, 100]
        case 'premium':
            return [101, 520]
        default:
            break;
    }
}

module.exports = {
    getCategoryObj,
    firstLetterToUpper,
    getPriceRange,
}
