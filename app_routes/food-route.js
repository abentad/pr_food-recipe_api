const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const {createFood} = require('../app_services/food-service');
const sharp = require("sharp");
const fs = require('fs');

//
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadedfilesPath),
  filename: (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({ storage: storage });
const uploadedfilesPath = path.join(__dirname, "../", "uploadedFiles");


//posting food route: /food/upload
router.post("/", upload.single("food-image"),async (req, res) => {
    //file name of the new compressed image file 
    const compressedImageFileName = "food-image_" + Date.now().toString() + ".jpeg";
    //path of the new uploaded compressed image file
    const compressedFilePath = path.join(__dirname, "../" , "public", "uploads", "images", "foods", compressedImageFileName);
    //resizer
    sharp(req.file.path).resize(820,450).jpeg({ quality: 80, chromaSubsampling: "4:4:4" }).toFile(compressedFilePath,(error,info)=>{
      if (error) {
        res.json({message: "cannot resize image because: " + error.message});
      } else {
        const fileName = path.join(__dirname, "../", "uploadedFiles", req.file.filename);
        //deleting original file
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
        res.json({results});
      }
    });
});

//getting food-image route:  /food/upload/images/{name of the image}
router.get("/images/:food_image_name",(req,res)=>{
    const imagesPath = path.join(__dirname, "../" , "public", "uploads", "images", "foods/")
    res.download(imagesPath + req.params.food_image_name);
})


module.exports = router;


