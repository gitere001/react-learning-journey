// File: server/server.js
const express = require('express');
const app = express();
const port = process.env.PORT || "8080";
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const mpesaRoutes = require('./routes/mpesa');
app.use('/', mpesaRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));