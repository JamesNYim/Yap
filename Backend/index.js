const express = require("express"); // Creating express var
const app = express(); // Initializing express
const cors = require("cors")
const pool = require("./db");

// Middleware
app.use(cors({
   origin: 'http://localhost:3000'
}));
app.use(express.json()); //req.body

const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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
      res.status(500).json('Server Error');
   }
})

// Get a User by email or username
app.get("/login/get", async (req, res) => {
   const { login } = req.query;
   if (!login) {
      return res.status(400).json({ error: "Missing 'login' query parameter" });
   }

   let query, values;
   if (email_pattern.test(login)) {
      query = "SELECT * FROM users WHERE email = $1";
      values = [login];
   } else {
      query = "SELECT * FROM users WHERE username = $1"
      values = [login];
   }
   try {
      const user = await pool.query(query, values);

      if (user.rows.length > 0) {
         res.status(200).json(user.rows[0]);
      } else {
         res.status(404).json({error: "User not found"});
      }
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Server Error" })
   }
});

// Update a User by email or username
app.put("/update/put", async(req,res) => {
   const { login } = req.query;
   if (!login) {
      return res.status(400).json({ error: "Missing 'login' query parameter" });
   }

   let query, value;

});

// Delete a User by email or username

// App is going to be listening for connections on port 1234
app.listen(5001, () => {
   console.log("Server is listening on port 5001....")
});