
// Universal options always when sidebar is needed
function getSidebarOptions (req) {
    return {
        sidebarIsNeeded: true,
        categories: req.itemCategories.all,
        currentUser: req.currentUser,
    }
}

module.exports = getSidebarOptions;
