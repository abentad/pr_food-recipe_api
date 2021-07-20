const pool = require("../config/database");

const ingredientsTable = "ingredients";


module.exports = {
    createIngredients: (data,callback)=>{
        pool.query(
            `insert into ${ingredientsTable}(ingredientName, ingredientImage, foodId) values(?,?,?)`,
            // [data.stepName, data.stepDescription,data.stepCookTime,data.food_id],
            // [data.map(item=> [item.stepName, item.stepDescription,item.stepCookTime,item.foodId])],
            [data.ingredientName, data.ingredientImage,data.foodId],
            (error, results, fields) => {
              if (error) {
                callback(error);
              } else {
                callback(null, results);
              }
            }
        );
    },
}