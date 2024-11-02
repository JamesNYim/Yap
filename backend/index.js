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
app.post("/users", async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        // Step 1: Insert into users table
        const newUserResult = await pool.query(
            "INSERT INTO users (username, email, password) VALUES($1, $2, $3) RETURNING *",
            [username, email, password]
        );

        const newUser = newUserResult.rows[0];

        // Step 2: Use the returned user_id to insert into playerInfo
        const newPlayerInfoResult = await pool.query(
            "INSERT INTO playerInfo (playerid, playername, balance, hasloggedintoday) VALUES($1, $2, $3, $4)",
            [newUser.user_id, username, 0, false]
        );

        res.json({ user: newUser, playerInfo: newPlayerInfoResult.rows[0] });
    } catch (err) {
        console.error("Error occurred while inserting user or player info:", err.message);
    }
});
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
app.post('/check-user-exists', async (req, res) => {
    const { username } = req.body;
    try {
        const userResult = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

         
        // If an account with a username exists. 
        if (userResult.rows.length > 0) {
            return res.status(200).json({ exists: false, message: 'Username already exists' }); 
        } 
        // If username does not exist
        return res.status(200).json({exists: true}); 
    }
    catch (e) {
        console.log('Error checking availability', e);
        res.status(500).send('Server Error');
    }
});

// Checking if an email can be registered
app.post('/check-email-exists', async (req, res) => {
    const { email } = req.body;
    try {
        const emailResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        console.log('Email query: ', emailResult.rows.length);
        
        // If an Email is already registered
        if (emailResult.rows.length > 0) {
            return res.status(200).json({ exists: false, message: 'Email already exists' });
        }
        
        // If email can be registered
        return res.status(200).json({exists: true});
    }
    catch (e) {
        console.log('Error checking availability', e.message);
        res.status(500).send('Server Error');
    }
});

// Logging a user in
app.post('/login' , async (req, res) => {
    const loginInfo = req.body;
    const username = loginInfo.username;
    const password = loginInfo.password;
    console.log("Username: " + username);
    console.log("Password: " + password);
    
    try {
        const userResult = await pool.query('SELECT password FROM users WHERE username = $1', [username]);
        
        // If a username is registered check if password is the same
        const userPass = userResult.rows[0].password;
        if (userPass == password) {
            return res.status(200).json({success: true});
        }
        return res.status(200).json({success: false, message: 'Incorrect Password'});
    }
    catch (e) {
    
    }
});

// Getting a users post
app.get('/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const userPosts = await pool.query('SELECT * FROM posts WHERE creator_name = $1', [username]);
        return res.status(200).json({posts: userPosts.rows});
    }
    catch (e) {
        return res.status(500).json({message: "error getting user it broke"})
    }
});

// Getting Player Info
app.get('/getPlayerInfo/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const playerInfo = await pool.query('SELECT * FROM playerInfo WHERE playerName = $1', [username]);
        return res.status(200).json({info: playerInfo.rows});
    }
    catch (e) {
        return res.status(500).json({message: "Failed to get player info"});
    }
});

