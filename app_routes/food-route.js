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


//
router.post("/", upload.single("food-image"),async (req, res) => {
    const compressedImageFileName = "food-image_" + Date.now().toString() + ".jpeg";
    const compressedFilePath = path.join(__dirname, "../" , "public", "uploads", "images", "foods", compressedImageFileName);
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

module.exports = router;


