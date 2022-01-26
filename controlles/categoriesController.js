const {getCategoryObj, firstLetterToUpper} = require("../helpers/categoryControllerHelpers");

function getCategoryNameFromUrl (url) {
    const arrFromUrl = url.split("/"); // First make array of url splitting them from /
    // take last element, add s to the end and return
    return arrFromUrl[arrFromUrl.length - 1] + 's';
}

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
