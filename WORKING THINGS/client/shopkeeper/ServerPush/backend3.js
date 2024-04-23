const express = require('express');
const multer = require('multer');
const path = require('path');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5001;

app.use(bodyParser.json());
app.use(cors());


// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/uploads'); // specify the folder where images will be stored
  },
  filename: function (req, file, cb) {
    const imgName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    cb(null, imgName);
    console.log(imgName);
  }
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.static('public'));


mongoose.connect('mongodb://0.0.0.0:20000/myProducts', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

const productSchema = new mongoose.Schema({
  productName: String,
  productDescription: String,
  productPrice: Number,
  productQuantity: Number,
  imageURL: String,
});

const Product = mongoose.model('ProductShopkeeper', productSchema);


app.post('/logs', upload.single('image'), async (req, res) => {
  const logFile = req.body;
  console.log(logFile);

  const { productName, productDescription, productPrice, productQuantity } = req.body;
  const imageURL = req.file.filename;

  const product = new Product({
    productName,
    productDescription,
    productPrice,
    productQuantity,
    imageURL,
  });

  await product.save();


  res.send("Data Recieved...."); // Send the uploaded file details as response
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
