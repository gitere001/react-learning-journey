// File: server/server.js
const express = require('express');
const app = express();
const port = process.env.PORT || "5001";
const cors = require('cors')
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
	origin: "*",
	methods: ["POST", "GET"],
  }));

// Routes
const mpesaRoutes = require('./routes/mpesa');
app.use('/', mpesaRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));