const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tweaksSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    prepTime: {
        type: Number,
        min: 0,
    },
    cookTime: {
        type: Number,
        min: 0,
    },
    ingredients: [String],
    steps: [String],
    comment: String,
}, {
    timestamps: true,
})

const recipeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
    },
    mainCategory: {
        type: String,
        enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Drink']
    },
    prepTime: {
        type: Number,
        min: 0,
    },
    cookTime: {
        type: Number,
        min: 0,
    },
    ingredients: [String],
    steps: [String],
    tweaks: [tweaksSchema],
}, {
    timestamps: true,
})

module.exports = mongoose.model('Recipe', recipeSchema)