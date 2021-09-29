const {animals, sizes} = require("../animalsAndSizes");
const faker = require("faker");

const StuffedAnimal = require("../../modules/stuffedAnimal");
const Category = require("../../modules/categories");

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


function createCategoryDoc () {
    
    const sizeCategory = new Category({
        name: 'Sizes',
        description: 'Here you can see all of the different sizes that we offer our stuffed animals',
        subcategories: [
            {name: 'tiny', url: '/categories/sizes/tiny'},
            {name: 'medium', url: '/categories/sizes/medium'}
        ],
        url: '/categories/sizes'
    });
    sizeCategory.save()
                .then(() => {
                    console.log('New category doc added')
                })
                .catch(e => console.log(e))
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

module.exports = {createStuffedAnimalDoc, createCategoryDoc} ;