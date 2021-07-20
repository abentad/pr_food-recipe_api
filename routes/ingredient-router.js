const router = require("express").Router();
const {addIngredients} =require('../controllers/ingredient-controller');


//
router.post("/",addIngredients);

module.exports = router;