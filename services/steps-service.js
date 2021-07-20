const pool = require("../config/database");

const stepsTable = "steps";

module.exports = {
    createSteps: (data, callback) =>{
        console.log(data.length);
        console.log(data);
        // const items = [];
        // console.log(data[1]);

        // for(var i = 0;i<data.length;i++){
        //   items.push(JSON.parse(data[i]));
        // }
        //TODO: work with the multiple steps inserting
        pool.query(
            `insert into ${stepsTable}(stepName, stepDescription, stepCookTime, foodId) values(?,?,?,?)`,
            // [data.stepName, data.stepDescription,data.stepCookTime,data.food_id],
            [data.map(item=> [item.stepName, item.stepDescription,item.stepCookTime,item.foodId])],
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


// const items = [
//   {name: 'alpha', description: 'describes alpha', value: 1},
//   ...
// ];

// db.query(
//   'INSERT INTO my_table (name, description, value) VALUES ?',
//   [items.map(item => [item.name, item.description, item.value])],
//   (error, results) => {...}
// );