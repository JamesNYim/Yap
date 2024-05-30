const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json());
app.listen(8888, () => {
    console.log("Server has started on port 8888");
});

// ROUTES //

// Create a user //
app.post("/users", async(req, res) => {
   try {

        const {username} = req.body;
        const newUser = await pool.query(
            "INSERT INTO users (username) VALUES($1) RETURNING *", 
            [username]);

        res.json(newUser);
    } 
    catch(err) {
       console.log(err.message); 
    }
})
// Get all users //
app.get("/users", async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM users");
        res.json(allUsers.rows);
    }
    catch (err) {
        console.log(err.message);
    }
});

// Get a user //
app.get("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const users = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);
        res.json(users.rows[0]);
        console.log(req.params);
    }
    catch (err) {
        console.log(err.message);
    }
});

// Update a user //
app.put("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { username } = req.body;
        const updateUser = await pool.query(
            "UPDATE users SET username = $1 WHERE user_id = $2",
            [username, id]
        );

        res.json("Users was updated!");
    }
    catch (err) {
        console.error(err.message);
    }
});
// Delete a user
app.delete("/users/:id", async (req, res) => {
    const { id } = req.params;
    const deleteUser = await pool.query(
        "DELETE FROM users WHERE user_id = $1", 
        [id]
    );
    res.json("User was deleted");
});
