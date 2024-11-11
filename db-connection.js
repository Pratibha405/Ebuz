const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.DB_CONNECTION_STRING;

mongoose
  .connect(uri)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB');
  })
  .catch((error) => {
    console.error('❌ Failed to connect to MongoDB:', error);
  });
