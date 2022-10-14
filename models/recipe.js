const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tweaksSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    username: String,
    userAvatar: String,
    prepTime: {
        type: Number,
        min: 0,
    },
    cookTime: {
        type: Number,
        min: 0,
    },
    ingredients: String,
    steps: String,
    comment: String,
}, {
    timestamps: true,
})

const recipeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    username: String,
    userAvatar: String,
    title: {
        type: String,
    },
    mainCategory: {
        type: String,
        enum: ['Breakfast', 'Second Breakfast', 'Luncheon', 'Dinner', 'Supper']
    },
    prepTime: {
        type: Number,
        min: 0,
    },
    cookTime: {
        type: Number,
        min: 0,
    },
    ingredients: String,
    steps: String,
    tweaks: [tweaksSchema],
}, {
    timestamps: true,
})

module.exports = mongoose.model('Recipe', recipeSchema)