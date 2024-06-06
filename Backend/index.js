const express = require("express"); // Creating express var
const app = express(); // Initializing express
const cors = require("cors")
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const pool = require("./db");
const {values} = require("pg/lib/native/query");

// Middleware
app.use(cors({
   origin: 'http://localhost:3000'
}));
app.use(express.json()); //req.body
app.use(cookieParser())
app.use(session({
   secret: process.env.SESSION_SECRET,
   resave: false,
   saveUninitialized: false,
   cookie: {
      secure: false,
      maxAge: 60 * 60 * 24 * 1000
   } // set the session cookie properties
}))

const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

//ROUTES//

// Create New User (Registration)
app.post("/signup",async(req, res) => {
   const { username, email, password } = req.body;

   try {
      const existingUserQuery = "SELECT * FROM users WHERE username = $1 OR email = $2";
      const existingUser = await pool.query(existingUserQuery, [username, email]);

      if (existingUser.rows.length > 0) {
         // If a user is found, return an error
         return res.status(409).json({ message: "Username or email already exists" });
      }

      const saltRounds = 10
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const query = "INSERT INTO users (username, email, password) VALUES($1, $2, $3) RETURNING *";
      const values = [username, email, hashedPassword];
      const { newUser } = await pool.query(query, values)

      if (result.rows.length > 0) {
         const { password, ...newUser } = result.rows[0];
         res.status(201).json(newUser.rows[0]);
      } else {
         throw new Error("Insert Failed");
      }
   } catch (err) {
      console.error("Error on /signup:", err)
      res.status(500).json('Server Error');
   }
})

// Get a User by email or username
app.post("/login", async (req, res) => {
   const { username, password } = req.body;

   try {
      const query = "SELECT * FROM users WHERE username = $1 OR email = $1";
      const { rows } = await pool.query(query, [username]);
      if (rows.length === 0) {
         return res.status(404).json({ success: false, message: "User not found" });
      }

      const user = rows[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
         res.json({ success: true, message: "Login successful" });
      } else {
         res.status(401).json({ success: false, message: "Invalid password" });
      }
   } catch (err) {
      console.error("Error on /login:", err.message);
      res.status(500).json({ success: false, message: "Server Error" });
   }
});

// Update a User by email or username
app.put("/update/put", async(req,res) => {
   const { login, newPassword } = req.query;

   if (!login) {
      return res.status(400).json({ error: "Missing 'login' query parameter" });
   }
   if (!newPassword) {
      return res.status(400).json({ error: "Missing 'newPassword' query parameter" });
   }

   let query, values;
   if (email_pattern.test(login)) {
      query = "Update users SET password = $1 WHERE email = $2";
      values = [newPassword, login];
   } else {
      query = "UPDATE users SET password = $1 WHERE username = $2";
      values = [newPassword, login];
   }

   try {
      const updateUser = await pool.query(query, values);

      if (updateUser.rows.length > 0) {
         res.status(200).json(updateUser.rows[0]);
      } else {
         res.status(404).json({error: "User not found"});
      }
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Server Error" })
   }
});

// Delete a User by email or username
app.delete("/userdelete/delete", async(req,res) => {
   const { login, password } = req.query;

   if (!login || !password) {
      return res.status(400).json({ error: "Missing 'login' and/or 'password' query parameter" });
   }

   let findQuery, deleteQuery, values;

   if (email_pattern.test(login)) {
      findQuery = "SELECT * FROM users WHERE email = $1";
      deleteQuery = "DELETE FROM users WHERE email = $2 RETURNING *";
      values = [login];
   } else {
      findQuery = "SELECT * FROM users WHERE username = $1";
      deleteQuery = "DELETE FROM users WHERE username = $2 RETURNING *";
      values = [login];
   }

   try {
      const result = await pool.query(findQuery, values);
      if (result.rows.length === 0) {
         return res.status(404).json({error: "User not found"});
      }
      const user = result.rows[0];
      if (password !== user.password) {
         return res.status(403).json({error: "Passwords do not match"});
      }

      const deleteResult = await pool.query(deleteQuery, values);
      if (deleteResult.rows.length > 0) {
         res.status(200).json(deleteResult.rows[0]);
      } else {
         res.status(404).json({error: "User not found"});
      }
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Server Error" })
   }
});

// App is going to be listening for connections on port 1234
app.listen(5001, () => {
   console.log("Server is listening on port 5001....")
});