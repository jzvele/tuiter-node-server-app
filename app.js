// This file creates and configures an HTTP server listening for incoming HTTP requests

// The require function is equivalent to the import keyword and loads a library into the local source. The express() function call creates an instance of the express library and assigns it to local constant app. Developers use the app instance to configure the server on what to do when various types of requests are received. For instance the example below uses the app.get() function to configure an HTTP handler by mapping the URL pattern '/hello' to a function that handles the HTTP request.
import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://jzvelebilova:BMQK870wFhGIaggM@learningcluster.uknuxou.mongodb.net/?retryWrites=true&w=majority";
import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import HelloController from "./controllers/hello-controller.js";
import UserController from "./controllers/users/users-controller.js";
import TuitsController from "./controllers/tuits/tuits-controller.js";
import * as tuitsDao from "./controllers/tuits/tuits-dao.js";

// const CONNECTION_STRING = PROCESS.ENV.DB_CONNECTION_STRING
mongoose.connect('mongodb://127.0.0.1:27017/tuiter');

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const app = express();
app.use(cors());    // configure cors right after instantiating express
app.use(express.json());    // parse JSON from HTTP request body
TuitsController(app);

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        const tuits = await tuitsDao.findTuits()
        console.log("Found Tuits")
        console.log(tuits)
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);

HelloController(app)
UserController(app)
app.listen( 4000)

//A request to URL http://localhost:4000/hello triggers the function implemented in the second argument of app.get(). The handler function receives parameters req and res which allows the function to participate in the request/response interaction, common in client/server applications. The res.send() function responds to the request with the text Hello World!

//From the point of view of browsers, http://localhost:4000/hello is referred to as a URL (Uniform Resource Locator). From the point of view of the server we often use the term HTTP endpoint or just endpoint.

