const express = require("express"); // Creating express var
const app = express(); // Initializing express
const cors = require("cors")
const pool = require("./db");

// Middleware
app.use(cors({
   origin: 'http://localhost:3000'
}));
app.use(express.json()); //req.body

//ROUTES//

// Create New User (Registration)
app.post("/signup",async(req, res) => {
   const { username, email, password } = req.body;
   try {
      const query = "INSERT INTO users (username, email, password) VALUES($1, $2, $3) RETURNING *";
      const values = [username, email, password];
      const { newUser } = await pool.query(query, values)
      res.status(201).json(newUser.rows[0]);
   } catch (err) {
      console.error("Error on /signup:", err)
      res.status(500).send('Server Error');
   }
})

// Get all Users

// Get a User By ID

// Update a User

// Delete a User

// App is going to be listening for connections on port 1234
app.listen(5001, () => {
   console.log("Server is listening on port 5001....")
});