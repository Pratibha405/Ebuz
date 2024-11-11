const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const path = require('path');
require('dotenv').config({ path: './.env' });
const cors = require('cors');

dotenv.config(); // Only this line is needed to load .env

const app = express();

app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
  secret: 'your-secret-key',  // A secret key to sign the session ID cookie
  resave: false,
  saveUninitialized: true
}));


// test route
app.get('/test', (req, res) => {
  res.send('Server is working!');
});


// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);


// Serve HTML files
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'views', 'login.html')));
app.get('/cart', (req, res) => res.sendFile(path.join(__dirname, 'views', 'cart.html')));
console.log('DB Connection String:', process.env.DB_CONNECTION_STRING);

const PORT = process.env.PORT || 8008;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

