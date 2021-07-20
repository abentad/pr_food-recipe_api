const pool = require("../config/database");

const stepsTable = "steps";

module.exports = {
    createSteps: (data, callback) =>{
        const steps = [];
        try {
          JSON.parse(JSON.stringify(data)).forEach((step)=> steps.push(step));
        } catch (error) {
          console.log(`cannot parse because: ${error.message}`);
        }
        console.log(`found ${steps.length} steps`);
        console.log(steps.map(step=>`${step.stepName},${step.stepDescription},${step.stepCookTime},${step.foodId}`));
        pool.query(
            `INSERT INTO ${stepsTable}(stepName, stepDescription, stepCookTime, foodId) VALUES ?`,
            [steps.map(step => [step.stepName, step.stepDescription, step.stepCookTime,step.foodId])],
            (error, results, fields) => {
              if (error) {
                callback(error);
              } else {
                callback(null, results);
              }
            }
        );
    },
    recieveAllSteps: (id,callback)=>{
        pool.query(
            `select * from ${stepsTable} where foodId = ?`,
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