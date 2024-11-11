document.addEventListener('DOMContentLoaded', function () {
    console.log("Welcome to Book & Sip Studio!");

    // Elements for authentication
    const logoutButton = document.getElementById('logoutButton');
    const loginButton = document.getElementById('loginButton');

    // Elements for coffee dropdown
    const coffeeOffers = document.getElementById('coffeeOffers');
    const coffeeDropdown = document.getElementById('coffeeDropdown');

    // Initial setup for buttons
    setupAuthUI();

    // Event listeners for authentication buttons
    if (logoutButton) logoutButton.addEventListener('click', logout);
    if (loginButton) loginButton.addEventListener('click', redirectToLogin);

    // Setup coffee dropdown menu
    setupCoffeeDropdown();

    setupAddToCartButtons();

    // Close the dropdown when clicking outside of it
    document.addEventListener('click', function (event) {
        if (coffeeDropdown && coffeeOffers && 
            !coffeeOffers.contains(event.target) && 
            !coffeeDropdown.contains(event.target)) {
            coffeeDropdown.style.display = 'none';
        }
    });
});



// Function to manage UI based on authentication status
function setupAuthUI() {
    const token = localStorage.getItem('token');
    const logoutButton = document.getElementById('logoutButton');
    const loginButton = document.getElementById('loginButton');

    if (token) {
        // User is logged in
        if (logoutButton) logoutButton.style.display = 'inline-block';
        if (loginButton) loginButton.style.display = 'none';
    } else {
        // User is not logged in
        if (logoutButton) logoutButton.style.display = 'none';
        if (loginButton) loginButton.style.display = 'inline-block';
    }
}

// Function to toggle coffee dropdown
function setupCoffeeDropdown() {
    const coffeeOffers = document.getElementById('coffeeOffers');
    const coffeeDropdown = document.getElementById('coffeeDropdown');

    if (coffeeOffers) {
        coffeeOffers.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default link behavior
            if (coffeeDropdown) {
                coffeeDropdown.style.display = 
                    (coffeeDropdown.style.display === 'block') ? 'none' : 'block';
            }
        });
    }
}

// Redirect to Login Page
function redirectToLogin() {
    window.location.href = 'login.html';
}

// Logout Function
function logout() {
    localStorage.removeItem('token');
    alert("You have been logged out.");
    window.location.href = 'index.html';
}


function setupAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Check if the user is logged in
            const token = localStorage.getItem('token');
            if (!token) {
                // If user is not logged in, alert and stop the process
                alert("You need to log in to add items to the cart.");
                return;
            }
            
            // Get the closest coffee item div
            const productDetails = button.closest('.coffee-item');
            const productName = productDetails.querySelector('h2').innerText; // Get product name
            const productPriceText = productDetails.querySelector('.price').innerText; // Get price text
            const productPrice = parseFloat(productPriceText.replace('$', '').trim()); // Parse price to float

            if (isNaN(productPrice)) {
                console.error("Invalid price:", productPriceText);
                return;
            }

            // Get quantity input field and parse quantity
            const quantityInput = document.getElementById(`quantity-${productName.toLowerCase()}`);
            const quantity = quantityInput ? parseInt(quantityInput.value) : 1; // Default to 1 if no input is found

            if (!quantity || quantity <= 0) {
                alert("Please enter a valid quantity.");
                return;
            }

            // Add the item to the cart
            addItemToCart(productName, productPrice, quantity);
        });
    });
}

function addItemToCart(name, price, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItemIndex = cart.findIndex(item => item.name === name);

    if (existingItemIndex !== -1) {
        // If item already exists in cart, update its quantity
        cart[existingItemIndex].quantity += quantity;
    } else {
        // If item doesn't exist in cart, add a new item
        const newItem = {
            name: name,
            price: price,
            quantity: quantity
        };
        cart.push(newItem);
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    console.log("Cart after adding item:", JSON.parse(localStorage.getItem('cart')));
    alert(`${name} has been added to the cart!`);
}

