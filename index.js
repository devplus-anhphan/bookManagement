const express = require('express'); //Import the express dependency
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 5000;                  //Save the port number where your server will be listening
const mongoose = require("mongoose");
const Books = require("./routers/books")
const Users = require("./routers/user")
const Auth = require("./routers/auth")

app.use(express.json());

const username = "tonyphan04";
const password = "admin123";
const cluster = "cluster0.7kgfr";
const dbname = "mydb";

mongoose.connect(
    `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

app.use('/api/books', Books);
app.use('/api/users', Users);
app.use('/api/auth', Auth);

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`);
});