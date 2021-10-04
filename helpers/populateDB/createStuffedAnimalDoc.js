const {animals, sizes, prices} = require("../animalsAndSizes");
const faker = require("faker");

const StuffedAnimal = require("../../modules/stuffedAnimal");
const Category = require("../../modules/categories");

const sizeCategory = new Category({
    name: 'Sizes',
    description: 'Here you can see all of the different sizes that we offer our stuffed animals',
    subcategories: getSubcategories(sizes, 'size'),
    url: '/categories/size'
});


const animalCategory = new Category({
    name: 'Animals',
    description: 'Here you can see all different animal species that we offer our stuffed animals',
    subcategories: getSubcategories(animals, 'animal'),
    url: '/categories/animal'
});

const priceCategory = new Category({
    name: 'Prices',
    description: 'Our prices range from 0€ to 520€',
    subcategories: getSubcategories(prices, 'price'),
    url: '/categories/price'
});

const colorCategory = new Category({
    name: 'Colors',
    description: 'We have wide range of different pastel color stuffed animals',
    url: '/categories/color'
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


module.exports = {createStuffedAnimalDoc, createCategoryDoc};