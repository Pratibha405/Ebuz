const express = require('express');
const router = express.Router();

// Add an item to the cart stored in the session
router.post('/add', (req, res) => {
    const { name, price } = req.body;

    // Initialize the cart if it doesn't exist in the session
    if (!req.session.cart) {
        req.session.cart = [];
    }

    let cart = req.session.cart;

    // Check if the item is already in the cart
    const existingItemIndex = cart.findIndex(item => item.name === name);

    if (existingItemIndex !== -1) {
        // If the item is already in the cart, increment its quantity
        cart[existingItemIndex].quantity += 1;
    } else {
        // Otherwise, add it to the cart
        cart.push({ name: name, price: price, quantity: 1 });
    }

    // Save the updated cart back to the session
    req.session.cart = cart;

    // Respond with a success message
    res.json({ message: `${name} has been added to your cart.` });
});

// Example to retrieve cart data
router.get('/view', (req, res) => {
    res.json(req.session.cart || []);
});

module.exports = router;
