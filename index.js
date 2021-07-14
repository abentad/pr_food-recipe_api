const express = require("express");
const app = express();
const foodRoute = require('./app_routes/food-route');


//
app.use("/food/upload", foodRoute);


//
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server started at port ${port}\nhttp://localhost:${port}`));
