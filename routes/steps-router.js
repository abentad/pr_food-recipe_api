const router = require("express").Router();
const {addSteps,getAllSteps} =require('../controllers/steps-controller');


//Routes ----------------------------------------------------------------------
//
//for adding a step for a food by its foodId
router.post("/add",addSteps);
//for getting steps for a food by its foodId
router.get("/:id",getAllSteps);
// -----------------------------------------------------------------------------

module.exports = router;