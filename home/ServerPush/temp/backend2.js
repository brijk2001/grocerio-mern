const multer = require('multer');
const express = require('express');
const app = express();
const path = require('path');


const port = 3001;
const cors = require("cors")

app.use(cors())

app.use(express.json());

let imgName;
// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/uploads'); // specify the folder where images will be stored
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
  // res.json(logFile);
  res.send('Image Upload Success');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});