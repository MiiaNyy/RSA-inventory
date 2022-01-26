const {getCategoryObj, firstLetterToUpper, getCategoryNameFromUrl} = require("../helpers/categoryControllerHelpers");

// Single category is listed
function category_get (req, res) {
    try {
        const categoryName = getCategoryNameFromUrl(req.baseUrl);
        const categoryToUpper = firstLetterToUpper(categoryName);
        res.render('categoryList', {
            title: `RSA - ${ categoryToUpper }`,
            category: getCategoryObj(categoryName, req),
            currentUser: req.currentUser,
        })
    } catch (e) {
        console.log('Error happened:', e)
    }
}

// All categories are listed
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

module.exports = {
    categories_get,
    category_get,
}
