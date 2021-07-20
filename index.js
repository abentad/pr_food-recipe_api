const express = require("express");
const app = express();
const foodRoute = require('./routes/food-router');
const stepsRoute = require('./routes/steps-router');
const ingredientRoute = require('./routes/ingredient-router');

app.use(express.json());
//
app.use("/food", foodRoute);
app.use("/food/steps", stepsRoute);
app.use("/food/ingredients", ingredientRoute);


app.get("/",(req,res)=>{
  res.json(
    {message: "Welcome to 'aserar' api | for uploading food: /food/upload  | for getting foodImage: /food/upload/images/{name of the image}"}
  );
})

//
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server started at port ${port}\nhttp://localhost:${port}`));
