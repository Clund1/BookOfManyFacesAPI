//Dependencies
const mongoose = require('mongoose')

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: [
            'Acrobatics',
            'Arcana',
            'Athletics',
            'Crafting',
            'Deception',
            'Diplomacy',
            'Intimidation',
            'Lore',
            'Medicine',
            'Nature',
            'Occultism',
            'Performance',
            'Religion',
            'Society',
            'Stealth',
            'Survival',
            'Thievery',
            'Engineering',
            'Insight',
            'Perception',
            'Linguistics'
        ],
        default: 'Acrobatics',
        required: true,
    },
    level: {
        type: Number,
        enum: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20'],
        default: '1',
        required: true,
    },
    description: {
        type: String,
    }
})
module.exports = skillSchema