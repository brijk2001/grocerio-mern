const express = require('express')
const app = express()
const port = 5005 //changed port to avoid conflict with react port number.
const cors = require("cors")
const bodyParser = require('body-parser');

const { MongoClient, ObjectId } = require('mongodb');
//mongodb connection code below
let dbName = 'myProducts'
let collectionName = 'orders'

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
                    _id: 0,
                    orderID: 1,
                    orderStatus: 1,
                    User: 1,
                    order: 1,
                    Amount: 1,
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
                    // res.send("Error Occured while saving data.")
                    res.send(JSON.stringify({ "error": "ERROR POPULATING DATA", "response": null }))

                })
        })
})

// PUT request to update product status
app.put('/api/updateProductStatus/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.body; // New product status sent from the frontend

        
        res.json({ message: 'Product status updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// DELETE request to delete a product
app.delete('/api/deleteOrder/:id', async (req, res) => {
    let client; 

    try {
        const id = req.params.id;

        // Connect to MongoDB
        client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Delete the order with the specified ID
        const result = await collection.deleteOne({ _id: ObjectId(id) });

        // Check if the deletion was successful
        if (result.deletedCount === 1) {
            res.json({ message: 'Order deleted successfully' });
        } else {
            res.status(404).json({ message: 'Order not found or could not be deleted' });
        }
    } catch (err) {
        console.error('Error deleting order:', err);
        res.status(500).json({ message: 'Server Error' });
    } finally {
        // Close the connection if it was opened
        if (client) {
            await client.close().catch(console.error);
        }
    }
});




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})