const {createSteps} = require('../services/steps-service');

module.exports = {
    addSteps: (req,res)=>{
        const body = req.body;
        createSteps(body,(error,results)=>{
          if(error){
            console.log(error.message);
            res.json({message: `failed to inserts steps because: ${error.message}`});
          }else{
            console.log("steps posted");
            res.json({results});
          }
        })
    },
}