const pool = require("../config/database");

const ingredientsTable = "ingredients";


module.exports = {
    createIngredients: (data,callback)=>{
      const ingredients = [];
      try {
        JSON.parse(JSON.stringify(data)).forEach((ingredient)=> ingredients.push(ingredient));
      } catch (error) {
        console.log(`cannot parse because: ${error.message}`);
      }
      console.log(`found ${ingredients.length} ingredients`);
      console.log(ingredients.map(ingredient=>`${ingredient.ingredientName},${ingredient.ingredientNameAm},${ingredient.foodId}`));
      pool.query(
          `INSERT INTO ${ingredientsTable}(ingredientName, ingredientNameAm, foodId) VALUES ?`,
          [ingredients.map(ingredient => [ingredient.ingredientName, ingredient.ingredientNameAm, ingredient.foodId])],
          (error, results, fields) => {
            if (error) {
              callback(error);
            } else {
              callback(null, results);
            }
          }
      );
    },
    recieveAllIngredientsById: (id,callback)=>{
      pool.query(
          `select * from ${ingredientsTable} where foodId = ?`,
          [id],
          (error, results, fields) => {
              if (error) {
                callback(error);
              } else {
                callback(null, results);
              }
          }
      );
  }
}