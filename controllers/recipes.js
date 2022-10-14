const Recipe = require('../models/recipe');

module.exports = {
    index,
    new: newRecipe,
    create,
    show,
    delete: deleteRecipe,
    edit,
    update,
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
    recipe.steps = recipe.steps[0].trim();
    recipe.ingredients = recipe.ingredients[0].trim();
    
    recipe.steps = recipe.steps[0].split(/\s*, \s*/);
    recipe.ingredients = recipe.ingredients[0].split(/\s*, \s*/);
    
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

function deleteRecipe(req, res) {
    Recipe.findById(req.params.id, function(err, recipe) {
        recipe.remove()
        recipe.save(function(err) {
            res.redirect('/recipes')
        })
    })
}

function edit(req, res) {
    Recipe.findById(req.params.id, function(err, recipe) {
        res.render('recipes/edit', {title: 'Edit Recipe', recipe})
    })
}

function update(req, res) {
    Recipe.findByIdAndUpdate(
        req.params.id, 
        req.body,
        {new: true},
        function(err, recipe) {
            if (err || !recipe) return res.redirect('/recipes');
            res.redirect(`/recipes/${req.params.id}`)
        }
    )
}