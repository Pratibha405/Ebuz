let cart = [];

function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item;
        cartItemsContainer.appendChild(li);
    });
}

function checkout() {
    alert('Proceeding to checkout with the following items: ' + cart.join(', '));
}

function addToCart(title, author, price, quantityId) {
    const quantity = document.getElementById(quantityId).value;

    // Create the form data to send to PHP
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('price', price);
    formData.append('quantity', quantity);

    // Send a POST request to add_to_cart.php
    fetch('add_to_cart.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())  // Parse the JSON response
    .then(data => {
        if (data.success) {
            const messageDiv = document.getElementById('cart-message');
            messageDiv.textContent = `${title} added to the cart!`;
            messageDiv.style.display = 'block';
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 3000);
        } else {
            alert('Error adding to cart: ' + data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

function loadCart() {
    fetch('get_cart.php')
    .then(response => response.json())
    .then(data => {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';  // Clear current items
        let totalItems = 0;
        let totalPrice = 0;

        data.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.title} by ${item.author} - ${item.quantity} @ $${item.price} each`;
            cartItemsContainer.appendChild(li);

            totalItems += item.quantity;
            totalPrice += item.price * item.quantity;
        });

        document.getElementById('total-items').textContent = totalItems;
        document.getElementById('total-price').textContent = totalPrice.toFixed(2);
    })
    .catch(error => console.error('Error loading cart:', error));
}