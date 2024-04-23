const express = require('express');
const multer = require('multer');
const path = require('path');


let imgName;

const app = express();
const port = 5000;

var cors = require('cors');
app.use(cors());
app.options('*',cors());
var allowCrossDomain = function(req,res,next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();  
}
app.use(allowCrossDomain);

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/'); // specify the folder where images will be stored
  },
  filename: function (req, file, cb) {
    imgName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    
    cb(null, imgName);

    console.log(imgName);
  }
});

const upload = multer({storage: storage});


app.post('/logs', upload.single('image'), (req, res) => {
  const logFile = req.file;
  res.json(logFile);

  res.send('Image Upload Success');
});

app.listen(port, ()=> {
    console.log('listening on port');
});