const express = require("express");

const path = require("path");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const dotenv = require("dotenv");

const createStuffedAnimalDoc = require("./helpers/populateDB/createStuffedAnimalDoc").createStuffedAnimalDoc;
const createCategoryDoc = require("./helpers/populateDB/createStuffedAnimalDoc").createCategoryDoc;

dotenv.config();
const app = express();

const homepageRouter = require("./routes/homepage");
const categoryRouter = require("./routes/categories/categories");
const itemRouter = require("./routes/items/items");

mongoose.connect(process.env.CONNECTIONSTRING)
        .then(() => {
            app.listen(process.env.PORT || 3000);
    
    
            //createCategoryDoc();
            /*
             //Generate random stuffed animal document
             for (let i = 0; i < 10; i++) {
             createStuffedAnimalDoc();
             }*/
            console.log("Started listening to port... ")
        })
        .catch(err => console.log('Error happened when fetching database:', err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.engine('handlebars', exphbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', homepageRouter);
app.use('/categories', categoryRouter);
app.use('/item', itemRouter);




