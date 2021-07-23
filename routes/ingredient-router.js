const router = require("express").Router();
const {addIngredients, getIngredientsByFoodId} =require('../controllers/ingredient-controller');


//
router.post("/add",addIngredients);
//
router.get("/:id",getIngredientsByFoodId);

module.exports = router;