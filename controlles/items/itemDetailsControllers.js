const querystring = require("querystring");
const StuffedAnimal = require("../../modules/stuffedAnimal");

const getSidebarOptions = require("../../helpers/getSidebarOptions");

async function item_details_get (req, res) {
    try {
        const sidebarOptions = getSidebarOptions(req);
        res.render('itemDetails', {
            title: "RSA - Item details",
            item: await StuffedAnimal.findById(req.params.id).lean(),
            ...sidebarOptions,
        })
    } catch (e) {
        console.log(e);
    }
}

async function item_details_post (req, res) {
    try {
        if ( req.currentUser ) { // Only if user is logged in, removing item is possible
            StuffedAnimal.findByIdAndRemove(req.params.id, (err) => {
                if ( !err ) { // Removing element from db successful
                    const query = querystring.stringify({
                        "popUpMessage": true,
                        "itemIsDeleted": true,
                    });
                    res.redirect('/?' + query);
                } else {
                    console.log(err)
                }
            })
        } else {
            res.send('Login required before deleting item!')
        }
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    item_details_get,
    item_details_post,
}
