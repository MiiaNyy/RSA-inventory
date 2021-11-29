const express = require("express");

const path = require("path");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const createStuffedAnimalDoc = require("./helpers/populateDB/createStuffedAnimalDoc").createStuffedAnimalDoc;
const createCategoryDoc = require("./helpers/populateDB/createStuffedAnimalDoc").createCategoryDoc;

dotenv.config();
const app = express();

const homepageRouter = require("./routes/homepage");
const categoryRouter = require("./routes/categories/categories");
const itemRouter = require("./routes/items/items");
const apiRouter = require("./routes/api/api")
const loginRouter = require("./routes/login");
const signUpRouter = require("./routes/signUp");

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

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));

app.use(cookieParser());

app.use('/', homepageRouter);
app.use('/login', loginRouter);
app.use('/sign-up', signUpRouter);

app.use('/category', categoryRouter);
app.use('/item', itemRouter);
app.use('/api', apiRouter)




