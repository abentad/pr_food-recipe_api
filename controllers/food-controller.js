const {createFood, recieveFoods,deleteFood,recieveFoodById} = require('../services/food-service');
const sharp = require("sharp");
const path = require("path");
const fs = require('fs');


module.exports = {
    addFood: async (req, res) => {
        //file name of the new compressed image file 
        const compressedImageFileName = "foodImage_" + Date.now().toString() + ".jpeg";
        //path of the new uploaded compressed image file
        const compressedFilePath = path.join(__dirname, "../" , "public", "uploads", "images", "foods", compressedImageFileName);
        //resizer
        sharp(req.file.path).resize(820,500).jpeg({ quality: 60, chromaSubsampling: "4:4:4" }).toFile(compressedFilePath,(error,info)=>{
          if (error) {
            res.json({message: "cannot resize image because: " + error.message});
          } else {
            const fileName = path.join(__dirname, "../", "uploadedFiles", req.file.filename);
            //deleting original file from server
            fs.unlink(fileName, (err) => {
              if (err) {console.log("failed to delete image because: " + err.message)}
            //   console.log("File is deleted.");
            });
          }
        });
        //
        const body = req.body;
        console.log('inserting to Db image: ' + compressedImageFileName);
        createFood(body, compressedImageFileName, (error, results) => {
          if (error) {
            console.log(error.message);
            res.json({
              message: `failed to insert food because: ${error.message}`,
            });
          } else {
            console.log('food posted');
            res.json({results});
          }
        });
    },
    getAllFoods: (req,res)=>{
        recieveFoods((error,results)=>{
            if(error){
                console.log(error.message);
                res.json({message: `cannot get foods because: ${error.message}`});
            }else{
                console.log("recieved foods list");
                res.json({results});
            }
        });
    },
    getFoodById: (req,res)=>{
        const id =  req.params.id;
        recieveFoodById(id,(error,results)=>{
            if(error){
                console.log(error.message);
                res.json({message: `cannot get foods because: ${error.message}`});
            }else{
                console.log("recieved food by id");
                res.json({results});
            }
        });
    },
    removeFood: (req,res)=>{
        const id = req.params.id;
        //TODO: remove the image from server while deleting food to do that you need to find the image name of the food 
        //for deleting image from server ----------------------------------------------------------------------
        recieveFoodById(id,(error,results)=>{
            if(error){
                console.log(error.message);
                res.json({message: `cannot get food because: ${error.message}`});
                return;
            }else{
                console.log("recieved food by id");
                const imageName = results[0].foodImage.toString();
                const compressedFilePath = path.join(__dirname, "../" , "public", "uploads", "images", "foods", imageName);
                fs.unlink(compressedFilePath, (err) => {
                    if (err) {console.log("failed to delete image because: " + err.message)}
                  //   console.log("File is deleted.");
                });
            }
        });
        //-----------------------------------------------------------------------------------------------------
        //for deleting food from database --------------------------------------------------------------------
        deleteFood(id,(error,results)=>{
            if(error){
                console.log(error.message);
                res.json({
                  message: `failed to remove food because: ${error.message}`,
                });
            }else{
                console.log('food removed');
                res.json({results});
            }
        })
        //-----------------------------------------------------------------------------------------------------
    }
}