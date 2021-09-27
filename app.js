const express = require("express");

const path = require("path");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const dotenv = require("dotenv");

const faker = require("faker");
const StuffedAnimal = require("./modules/stuffedAnimal");

dotenv.config();
const app = express();

const homepageRouter = require("./routes/index");
const categoryRouter = require("./routes/categories/categories");

mongoose.connect(process.env.CONNECTIONSTRING)
        .then(() => {
            app.listen(process.env.PORT || 3000);
            /* Generate random data
             for (let i = 0; i < 10; i++) {
             getRandomAnimal();
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


function getRandomAnimal () {
    const newItem = {
        color: faker.commerce.color(),
        species: animals[Math.floor(Math.random() * animals.length)],
        name: faker.name.firstName(),
        size: sizes[Math.floor(Math.random() * sizes.length)],
        description: faker.lorem.words(),
        price: Math.floor(Math.random() * 520),
        numberInStock: Math.floor(Math.random() * 100)
    }
    
    const animal = new StuffedAnimal(newItem);
    animal.save()
          .then(() => {
              console.log('New document added')
          })
          .catch(e => console.log(e))
}

