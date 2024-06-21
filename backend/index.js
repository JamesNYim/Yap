const express = require("express"); const app = express();
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

        const {username, email, password} = req.body;
        const newUser = await pool.query(
            "INSERT INTO users (username, email, password) VALUES($1, $2, $3) RETURNING *", 
            [username, email, password]);

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

// Get a user by username //
app.get("/users/:username", async (req, res) => {
    try {
        const { username } = req.params;
        const users = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
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

// Checking if a username can be registered
app.post('/check-user-availability', async (req, res) => {
    const { username } = req.body;
    try {
        const userResult = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

         
        // If a Username is already taken
        if (userResult.rows.length > 0) {
            return res.status(200).json({ availability: false, field: 'username', message: 'Username is already taken' }); 
        } 
        // If username can be registered 
        return res.status(200).json({availability: true}); 
    }
    catch (e) {
        console.log('Error checking availability', e);
        res.status(500).send('Server Error');
    }
});

// Checking if an email can be registered
app.post('/check-email-availability', async (req, res) => {
    const { email } = req.body;
    try {
        const emailResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        console.log('Email query: ', emailResult.rows.length);
        
        // If an Email is already registered
        if (emailResult.rows.length > 0) {
            return res.status(200).json({ availability: false, field: 'email', message: 'Email is already registered' });
        }
        
        // If email can be registered
        return res.status(200).json({availability: true});
    }
    catch (e) {
        console.log('Error checking availability', e.message);
        res.status(500).send('Server Error');
    }
});
