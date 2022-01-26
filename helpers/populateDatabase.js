
// At start I used these functions to create stuffed animals inventory, items and categories
const faker = require("faker");

const StuffedAnimal = require("../modules/stuffedAnimal");
const Category = require("../modules/categories");

const animals = ['unicorn', 'crocodile', 'snake', 'bear', 'kitten', 'rabbit', 'lion', 'horse', 'fly', 'dog'];
const sizes = ['tiny', 'small', 'medium', 'large', 'huge'];
const prices = ['budget', 'medium', 'high', 'premium']

const sizeCategory = new Category({
    name: 'Sizes',
    description: 'Here you can see all of the different sizes that we offer our stuffed animals',
    subcategories: getSubcategories(sizes, 'size'),
    url: '/category/size'
});


const animalCategory = new Category({
    name: 'Animals',
    description: 'Here you can see all different animal species that we offer our stuffed animals',
    subcategories: getSubcategories(animals, 'animal'),
    url: '/category/animal'
});

const priceCategory = new Category({
    name: 'Prices',
    description: 'Our prices range from 0€ to 520€',
    subcategories: getSubcategories(prices, 'price'),
    url: '/category/price'
});

const colorCategory = new Category({
    name: 'Colors',
    description: 'We have wide range of different pastel color stuffed animals',
    url: '/category/color'
});

async function createCategoryDoc () {
    try {
        await colorCategory.save();
        await animalCategory.save();
        await sizeCategory.save();
        await priceCategory.save();
        console.log('New category docs added')
    } catch (e) {
        console.log(e)
    }
}

function randomColor (brightness) {
    function randomChannel (brightness) {
        const r = 255 - brightness;
        const n = 0 | ((Math.random() * r) + brightness);
        const s = n.toString(16);
        return (s.length === 1) ? '0' + s : s;
    }
    
    return '#' + randomChannel(brightness) + randomChannel(brightness) + randomChannel(brightness);
}

function getSubcategories (arr, categoryName) {
    return arr.map(item => {
        return {name: item, url: `/category/${ categoryName }/${ item }`}
    });
}

function createStuffedAnimalDoc () {
    const newItem = {
        color: randomColor(140),
        animal: animals[Math.floor(Math.random() * animals.length)],
        name: faker.name.firstName(),
        size: sizes[Math.floor(Math.random() * sizes.length)],
        description: faker.lorem.paragraph(),
        
        price: Math.floor(Math.random() * 200),
        numberInStock: Math.floor(Math.random() * 100),
    }
    
    const animal = new StuffedAnimal(newItem);
    animal.save()
          .then(() => {
              console.log('New document added')
          })
          .catch(e => console.log(e))
}
