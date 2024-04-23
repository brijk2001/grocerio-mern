// server.js
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const PORT = 3003;
const mongoURI = 'mongodb://localhost:27017/myProducts';

app.use(bodyParser.json());

// Connect to MongoDB
MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        const db = client.db('myProducts');
        const collection = db.collection('orders');

        const bodyParser = require('body-parser');
        const cors = require('cors');


        app.use(bodyParser.json());
        app.use(cors());

        // Endpoint to handle POST request
        app.post('/orders', (req, res) => {
            const data = req.body;

            // Clear existing data
            collection.deleteMany({})
                .then(() => {
                    // Insert new data
                    collection.insertMany(data)
                        .then(result => {
                            res.status(201).send(data);
                        })
                        .catch(error => {
                            console.error(error);
                            res.status(500).send('Error inserting data');
                        });
                })
                .catch(error => {
                    console.error(error);
                    res.status(500).send('Error clearing existing data');
                });
        });

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(error => console.error(error));
