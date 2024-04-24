const express = require("express"); // Creating express var
const app = express(); // Initializing express
const cors = require("cors")
const pool = require("./db");

app.use(cors());
app.use(express.json());



// App is going to be listening for connections on port 1234
app.listen(1234, () => {
   console.log("Server is Listening on port 1234....")
});