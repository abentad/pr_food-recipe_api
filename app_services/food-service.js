const pool = require("../app_config/database");

const foodTable = "foods";

module.exports = {
    createFood: (data, foodImageName, callback)=>{
        pool.query(
            `insert into ${foodTable}(foodName, foodImage) values(?,?)`,
            [data.foodName, foodImageName],
            (error, results, fields) => {
              if (error) {
                callback(error);
              } else {
                callback(null, results);
              }
            }
        );
    }
};