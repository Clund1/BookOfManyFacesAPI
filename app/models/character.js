const mongoose = require('mongoose')

const skillSchema = require('./skill')
const itemSchema = require('./item')

//LISTS FOR CHARACTER CLASSES AND RACES

const charSchema = new mongoose.Schema(
	{
        name: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
        },
        level: {
            type: Number,
            required: true,
        },
        class: {
            type: String,
            enum: [
                'Alchemist',
                'Mechanist',
                'Bard',
                'Champion',
                'Cleric',
                'Artificer',
                'Fighter',
                'Monk',
                'Ranger',
                'Rogue',
                'Technomancer',
                'Wizard',
            ],
            required: true,
        },
        race: {
            type: String,
            enum: [
                'Android',
                'Dwarf',
                'Elf',
                'Gnome',
                'Goblin',
                'Halfling',
                'Human',
                'Half-Elf',
                'Orc',
                'Vesk',
            ],
            required: true,
        },
        skills: [skillSchema],
        items: [itemSchema],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    },
        {
            timestamps: true,
            toObject: { virtuals: true },
            toJSON: { virtuals: true },
        }
)

charSchema.virtual('namePlate').get(function () {
    return `${this.name}: Level ${this.level} ${this.class}`
})

module.exports = mongoose.model('Character', charSchema)