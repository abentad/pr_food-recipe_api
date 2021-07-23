const {createIngredients, recieveAllIngredientsById} = require('../services/ingredients-service');

module.exports = {
    addIngredients: (req,res)=>{
        const body = req.body;
        createIngredients(body,(error,results)=>{
          if(error){
            console.log(error.message);
            res.json({message: `failed to inserts ingredient because: ${error.message}`});
          }else{
            console.log("ingredinets posted");
            res.json({results});
          }
        })
    },
    getIngredientsByFoodId: (req,res)=>{
      const id = req.params.id;
      recieveAllIngredientsById(id,(error,results)=>{
          if(error){
              console.log(error.message);
              res.json({message: `failed to get all ingredients because: ${error.message}`});
            }else{
              console.log("got all ingredients");
              res.json({results});
          }
      })
    }
}