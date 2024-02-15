const mongoose = require('mongoose')

const charSchema = new mongoose.Schema(
	{
        name: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        level: {
            type: Number,
            required: true,
        },
        class: {
            type: String,
            required: true,
        },
        race: {
            type: String,
            required: true,
        },
        // skills: [skillSchema],
        // items: [itemSchema],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    },
        {
            timestamps: true,
        }
)

module.exports = mongoose.model('Character', charSchema)