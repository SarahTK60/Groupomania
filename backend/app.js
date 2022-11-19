// import the node.js framework express
const express = require('express');
// import the MongoDB object modeling tool mongoose
const mongoose = require('mongoose');
// import helmet which helps secure Express apps by setting various HTTP headers
const helmet = require('helmet');
// import routers
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const usersRoutes = require('./routes/users');
const postRoutes = require('./routes/post');
// import path plugin to access directories and file paths
const path = require('path');
// dotenv loads environment variables from a .env file
require('dotenv').config();

// database connection
mongoose.connect(process.env.DB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

    
// create an express application
const app = express();

// Defines headers to avoid CORS errors . Allows all requests from all origins to access API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
  next();
});
// Setting headers with helmet
app.use(helmet({ crossOriginResourcePolicy: false }));

// express.json() replace bodyParser.json() to recognize the incoming Request Object as a JSON Object
app.use(express.json());

// Defines routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/posts', postRoutes);
// To store images locally
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;