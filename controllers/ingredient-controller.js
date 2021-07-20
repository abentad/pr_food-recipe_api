const {createIngredients} = require('../services/ingredients-service');

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
}