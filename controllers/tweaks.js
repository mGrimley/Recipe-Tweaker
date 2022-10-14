const Recipe = require('../models/recipe')

module.exports = {
    create,
    delete: deleteTweak,
}

function create(req, res) {
    Recipe.findById(req.params.id, function(err, recipe) {
        req.body.user = req.user._id
        req.body.userName = req.user.name
        req.body.userAvatar = req.user.avatar

        req.body.steps[0] = req.body.steps[0].trim();
        req.body.ingredients[0] = req.body.ingredients[0].trim();
        
        req.body.steps = req.body.steps[0].split(/\s*, \s*/);
        req.body.ingredients = req.body.ingredients[0].split(/\s*, \s*/);
        
        recipe.tweaks.push(req.body)

        recipe.save(function(err) {
            res.redirect(`/recipes/${recipe._id}`)
        })
    })
}

function deleteTweak(req, res) {
    Recipe.findOne({'tweaks._id': req.params.id, 'tweaks.user': req.user._id}).then(function(recipe) {
        if (!recipe) return res.redirect('/recipes')
        recipe.tweaks.remove(req.params.id)
        recipe.save().then(function() {
            res.redirect(`/recipes/${recipe._id}`)
        }).catch(function(err) {
            return next(err)
        })
    })
}