// import Password model
const passwordSchema = require('../models/Password');

module.exports = (req, res, next) => {
    // if password doesn't respect passwordSchema return error
    if (!passwordSchema.validate(req.body.password)) {
        res.status(400).json({message : 'Format de mot de passe incorrect. Votre mot de passe doit remplir ces conditions : Au minimum 8 caractères dont au moins 1 Majuscule, 1 minuscule, 1 chiffre - Aucun espace'})
    } else {
        next();
    }
};