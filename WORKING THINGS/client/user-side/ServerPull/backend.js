const express = require('express')
const app = express()
const port = 5000 //changed port to avoid conflict with react port number.
const cors = require("cors")
const bodyParser = require('body-parser');


//mongodb connection code below
const { MongoClient } = require('mongodb')
let dbName = 'myProducts'
let collectionName = 'products'

const url = `mongodb://0.0.0.0:20000/`;

app.use(cors())
app.use(bodyParser.json());
app.use(express.urlencoded({
    extended: true
}))


app.get('/showdata', (req, res) => {
    MongoClient.connect(url)
        .then((client) => {
            console.log("Database accessed!");
            const db = client.db(dbName);
            console.log("Collection accessed");

            db.collection(collectionName).find({}, {
                projection: {
                    _id: 0, productName: 1,
                    productDescription: 1,
                    productPrice: 1,
                    productQuantity: 1,
                    imageURL: 1,
                }
            }).toArray()
                .then((doc) => {
                    console.log(doc);
                    client.close();
                    // res.send(doc);
                    res.send(JSON.stringify({ "error": null, "response": doc }))
                })
                .catch((err) => {
                    console.error(err);
                    // res.send("Error Occured while savinf data.")
                    res.send(JSON.stringify({ "error": "ERROR POPULATIING DATA", "response": null }))

                })
        })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})