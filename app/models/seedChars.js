// Initial Characters Included In DB For Testing Purposes
// TERMINAL COMMAND = npm run charSeed

const mongoose = require('mongoose')
const Char = require('./character')
const db = require('../../config/db')

const startChars = [
    { name: 'Eldorin', age: 120, level: 5, class: 'Wizard', race: 'Elf' },
    { name: 'Lylthia Shadowheart', age: 25, level: 3, class: 'Rogue', race: 'Halfling' },
    { name: 'Xander-9', age: 35, level: 5, class: 'Mechanist', race: 'Android' }
]


// Establish DB Connection
mongoose.connect(db, {
    useNewUrlParser: true
})
// Remove All Creator-less Pets
    .then(() => {
        Char.deleteMany({ owner: null })
        .then(deletedChars => {
            console.log('Deleted Characters in SeedScript: ', deletedChars)
            //Populate with startChars array
            Char.create(startChars)
                .then(newChars => {
                    console.log('Seeded Characters Added to DB: \n', newChars)
                    // Close DB Connection
                    mongoose.connection.close()
                })
                .catch(error => {
                    console.log('Error Has Occurred: \n', error)
                    mongoose.connection.close()
                })
        })
        .catch(error => {
            console.log('Error Has Occurred: \n', error)
            mongoose.connection.close()
        })
    })
    .catch(error => {
        console.log('Error Has Occurred: \n', error)
        mongoose.connection.close()
    })