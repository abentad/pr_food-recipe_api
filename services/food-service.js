const pool = require("../config/database");

const foodTable = "foods";

module.exports = {
    createFood: (data, foodImageName, callback)=>{
        pool.query(
            `insert into ${foodTable}(foodName, foodImage, foodNameAm, foodDescription, foodDescriptionAm) values(?,?,?,?,?)`,
            [data.foodName, foodImageName, data.foodNameAm, data.foodDescription, data.foodDescriptionAm],
            (error, results, fields) => {
              if (error) {
                callback(error);
              } else {
                callback(null, results);
              }
            }
        );
    },
    recieveFoods: (callback)=>{
      pool.query(
        `select * from ${foodTable}`,
        [],
        (error,results,fields)=>{
          if(error){
            callback(error);
          }else{
            callback(null,results);
          }
        }
      );
    },
    recieveFoodById: (id, callback)=>{
      pool.query(
        `select * from ${foodTable} where foodId=?`,
        [id],
        (error,results,fields)=>{
          if(error){
            callback(error);
          }else{
            callback(null,results);
          }
        }
      )
    },
    deleteFood: (id, callback)=>{
      pool.query(
        `delete from ${foodTable} where foodId=?`,
        [id],
        (error,results,fields)=>{
          if(error){
            callback(error);
          }else{
            callback(null,results);
          }
        }
      )
    }
};

