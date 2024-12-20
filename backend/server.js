const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());



// Routes
app.use('/api/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
