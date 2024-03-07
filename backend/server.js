const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');

const dotenv = require("dotenv");
dotenv.config();

//database connect
const database = require("./config/database");
database.connect();

//import routes
const userRoutes = require('./routes/userRoutes.js');

//middlewares
app.use(express.json());
app.use(cookieParser());

//PORT declaration
const PORT = process.env.PORT || 4000;


app.use("/api/v1", userRoutes);

//default route
app.get("/", (req, res) => {
    return res.json({
      success: true,
      message: "Your server is up and running....",
    });
  });
  
  //activate the server
  app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
  });
  

