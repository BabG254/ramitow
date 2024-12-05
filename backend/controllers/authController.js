const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Environment variables
const SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const TOKEN_EXPIRY = process.env.JWT_EXPIRY || "1h"; // Easily changeable token expiry

// Password validation (at least 8 characters, at least 1 number, at least 1 capital letter)
const passwordValidation = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return regex.test(password);
};

// Signup
exports.signup = async (req, res) => {
  const { username, email, password, role = "user" } = req.body;

  // Check if password meets the criteria
  if (!passwordValidation(password)) {
    return res.status(400).json({
      error: "Password must be at least 8 characters long, include a number and a capital letter.",
    });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user data into DB
    await pool.execute(
      `INSERT INTO Users 
       (username, email, password, role, subscription_status, trial_end_date) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        username,
        email,
        hashedPassword,
        role,
        "FreeTrial",
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now for trial end
      ]
    );

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).json({ error: "User registration failed. Please try again later." });
  }
};
// Register Service Provider
exports.registerServiceProvider = async (req, res) => {
  const { username, email, password, role, latitude, longitude } = req.body;

  // Check if password meets the criteria
  if (!passwordValidation(password)) {
    return res.status(400).json({
      error: "Password must be at least 8 characters long, include a number and a capital letter.",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.execute(
      `INSERT INTO Users 
       (username, email, password, role, latitude, longitude, subscription_status, trial_end_date) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        username,
        email,
        hashedPassword,
        role || "service_provider", // Set default role if needed
        latitude,
        longitude,
        "FreeTrial",
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      ]
    );

    res.status(201).json({ message: "Service provider registered successfully!" });
  } catch (err) {
    console.error("Registration error:", err.message);
    res.status(500).json({ error: "Service provider registration failed." });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.execute("SELECT * FROM Users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: TOKEN_EXPIRY });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Login failed. Please try again." });
  }
};

// Search Nearby Services
exports.searchNearbyServices = async (req, res) => {
  const { latitude, longitude, radius } = req.query;

  try {
    const [rows] = await pool.execute(
      `SELECT *, 
              (6371 * acos(cos(radians(?)) 
              * cos(radians(latitude)) 
              * cos(radians(longitude) - radians(?)) 
              + sin(radians(?)) 
              * sin(radians(latitude)))) AS distance 
       FROM Users 
       WHERE role IN ('tow_truck', 'mechanic') 
       HAVING distance < ? 
       ORDER BY distance ASC`,
      [latitude, longitude, latitude, radius]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "No nearby services found." });
    }

    res.status(200).json({ services: rows });
  } catch (err) {
    console.error("Search error:", err.message);
    res.status(500).json({ error: "Error fetching nearby services." });
  }
};
