const Recipe = require('../models/recipe');

module.exports = {
    index,
    new: newRecipe,
    create,
    show,
}

function index(req, res) {
    Recipe.find({}, function(err, recipes) {
        res.render('recipes/index', {title: 'All Recipes', recipes})
    })
}

function newRecipe(req, res) {
    res.render('recipes/new', {title: 'Add Recipe'})
}

function create(req, res) {
    const recipe = new Recipe (req.body);

    recipe.user = req.user._id
    recipe.userName = req.user.name
    recipe.userAvatar = req.user.avatar

    recipe.title = recipe.title.trim();
    recipe.steps[0] = recipe.steps[0].trim();
    recipe.ingredients[0] = recipe.ingredients[0].trim();
    
    recipe.steps = recipe.steps[0].split(/\s*, \s*/);
    recipe.ingredients = recipe.ingredients[0].split(/\s*, \s*/);
    
    console.log(recipe)
    
    recipe.save(function(err) {
        if(err) {
            console.log(err)
            return res.redirect('/recipes/new');
        }
        res.redirect(`/recipes/${recipe.id}`);
    });
};

function show(req, res) {
    Recipe.findById(req.params.id, function(err, recipe) {
        res.render('recipes/show', {title: recipe.title, recipe})
    })
}