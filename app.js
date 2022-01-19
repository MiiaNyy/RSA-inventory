const express = require("express");

const path = require("path");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();

const homepageRouter = require("./routes/homepage");
const categoryRouter = require("./routes/categories/categories");
const itemRouter = require("./routes/items/items");

const apiRouter = require("./routes/api/api");

const loginRouter = require("./routes/login");
const signUpRouter = require("./routes/signUp");
const logoutRouter = require("./routes/logout");

const requireAuth = require('./middleware/authMiddleware');
const Category = require("./modules/categories");


mongoose.connect(process.env.CONNECTIONSTRING)
        .then(() => {
            app.listen(process.env.PORT || 3000);
            console.log("Started listening to port... ")
        })
        .catch(err => console.log('Error happened when fetching database:', err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');

const hbs = exphbs.create({});

hbs.handlebars.registerHelper('ifEqualReturnSelected', function (a, b) {
    if ( a === b ) {
        return "selected"
    }
})

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));

app.use(cookieParser());

app.use((req, res, next) => {
    requireAuth(req, res, next);
})

app.use( async (req, res, next) => {
    req.itemCategories = {
        sizes: await Category.find({name: 'Sizes'}).lean(),
        breeds: await Category.find({name: 'Animals'}).lean(),
        all: await Category.find({}).lean(),
    }
    next();
})

app.use('/', homepageRouter);
app.use('/login', loginRouter);
app.use('/signup', signUpRouter);
app.use('/logout', logoutRouter);

app.use('/category', categoryRouter);
app.use('/item', itemRouter);
app.use('/api', apiRouter);





