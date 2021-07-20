const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const {addFood, getAllFoods,removeFood,getFoodById} = require('../controllers/food-controller');

//for image storage ---------------------------------------------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadedfilesPath),
  filename: (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({ storage: storage });
const uploadedfilesPath = path.join(__dirname, "../", "uploadedFiles");
//---------------------------------------------------------------------------------

//ROUTES --------------------------------------------------------------------------------------
//
//for getting foodImage ------------------------------------------------------------------
//getting food-image route:  /food/upload/images/{name of the image}
router.get("/images/:food_image_name",(req,res)=>{
  const imagesPath = path.join(__dirname, "../" , "public", "uploads", "images", "foods/")
  res.download(imagesPath + req.params.food_image_name);
})
//-----------------------------------------------------------------------------------------
//for getting all foods 
router.get("/",getAllFoods);
//for getting a food by its foodId
router.get("/byid/:id",getFoodById);
//for posting food route: /food/upload
router.post("/upload", upload.single("foodImage"),addFood);
//for deleting food 
router.delete("/remove/:id",removeFood);

//-----------------------------------------------------------------------------------------



module.exports = router;


