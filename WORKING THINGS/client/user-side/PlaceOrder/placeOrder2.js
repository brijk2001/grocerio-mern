const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { default: userEvent } = require('@testing-library/user-event');

const app = express();
const port = 5007;

app.use(bodyParser.json());
app.use(cors());




app.use(express.json());
app.use(express.static('public'));


mongoose.connect('mongodb://0.0.0.0:20000/myProducts', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

const productSchema = new mongoose.Schema({
  orderID: String,
  orderStatus: String,
  User: {
    name: String,
    email: String,
    phone: String,
    address: String,
  },
  order: [{
    productName: String,
    productPrice: Number,
    quantity: Number,
    imageURL: String,
  }],
  Amount: Number,
});

const Product = mongoose.model('orders', productSchema);


app.post('/data', async (req, res) => {
  try {
    console.log(req.body)

    const { orderID, User, orderStatus, order, Amount } = req.body[0];

    // Check if User object and its properties are present
    if (true) {
      const { name, email, phone, address } = User;

      // Create a new Product instance
      const product = new Product({
        orderID,
        orderStatus,
        User: { name, email, phone, address },
        order: order,
        Amount
      });

      // Save the product to the database
      const savedProduct = await product.save();

      // Send the saved product as response
      res.status(201).json(savedProduct);
    } else {
      // Send an error response if User object is missing or invalid
      console.log("err")
      res.status(400).json({ error: 'Invalid user data' });
    }
  } catch (error) {
    // Handle any errors that occur during the data saving process
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
