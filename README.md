# <img src="public/assets/apple-touch-icon.png" width="40" height="40"/> RSA - Inventory

The goal of the project was to practice using Node.js Express and learn how to build an application based on the MVC
architecture.

## [Live version](https://rafaels-inventory.herokuapp.com/)

## General info
I created an inventory app for a company called “Rafael's Stuffed Animals”. The company sells stuffed animal toys.

The app allows users to browse the entire inventory of the company or find specific items according to different
categories; price, species, or size of the item. If the user is logged in to the application, they can also create or
remove items from the inventory.

## How I build it

As a database, I used MongoDB and Mongoose library. With the help of Mongoose, I wrote schemas and models for the
different categories, items, and users. It also aided in the validation of forms when a user creates new items to the
inventory or logs in to the application.

I protected user data by encrypting their personal information with hash and salt. This way, only encrypted usernames, and passwords are stored in the database. This way user data is safer if it gets accessed by outsiders.

The application is created from fully dynamic pages using Handlebars. Among other things, I created an
``
inventoryTable.handlebars
``
view that displays a table of items from either the entire inventory or only items from a specific category (species,
price, size). The page uses handlebars variables and functions to change the view of the page.

I also learned how to use and store JSON web tokens. Token gets created when user signs or logs in and its life span is
3 days in the browser. When the server gets any request, it uses a custom middleware called ``requireAuth()``. It checks if
the token exists or not. If the token does exist, it verifies it by using env token secret and saves it to the request by
the name ``currentUser``. This way server can render different views to the client depending on if the user is logged in (token
exists) or not.

```javascript
function requireAuth (req, res, next) {
    const token = req.cookies.jwt;
    // Check if json web token exists and is verified
    if ( token ) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if ( err ) {
                next()
            } else {
                req.currentUser = decodedToken.id;
                next();
            }
        })
    } else { // No token
        next()
    }
}
```

For extra credit, I also created a homepage for Rafael's Stuffed Animals company. I created it using React, Bootstrap,
CSS, and build it mobile-first.

### Technologies

- Node.js & Express
    - router, validation
    - custom middleware
- Handlebars
    - variables, build in and custom functions
- MVC architecture
- CRUD
- MongoDB & Mongoose
- Environmental variables
- Heroku
- json web tokens
- Bootstrap
- CSS
    - Building app mobile first

