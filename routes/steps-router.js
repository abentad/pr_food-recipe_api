const router = require("express").Router();
const {addSteps} =require('../controllers/steps-controller');


//
router.post("/",addSteps);

module.exports = router;