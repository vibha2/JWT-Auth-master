const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

const dotenv = require("dotenv");
dotenv.config();

//database connect
const database = require("./config/database");
database.connect();

//import routes
const userRoutes = require('./routes/userRoutes.js');


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
const corsOptions = {
  // origin: 'http://localhost:3000',
  origin: '*',
  credentials: true,
};
// app.use(cors(corsOptions));

//file-upload
const fileupload = require("express-fileupload");
//using this fileupload middleware, we can upload our files in db
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

//connect with cloudinary
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

app.use(cors(corsOptions));

//PORT declaration
const PORT = process.env.PORT || 4000;


app.use("/api/v1", userRoutes);
const fileRoutes = require('./routes/fileRoutes.js');
app.use('/api/v1/upload', fileRoutes);

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
  

