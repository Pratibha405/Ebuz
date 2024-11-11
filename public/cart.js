document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyMessage = document.getElementById('cart-empty-message');
    const cartTable = document.getElementById('cart-table');
    const totalAmountContainer = document.getElementById('total-amount');
    const checkoutButton = document.getElementById('checkout-button');
    
    // If the cart is not empty, display the items
    if (cart.length > 0) {
        emptyMessage.style.display = 'none'; // Hide the empty cart message
        cartTable.style.display = 'table'; // Show the cart table

        let totalAmount = 0; // Initialize total amount

        // Loop through the cart items and display each one
        cart.forEach((item, index) => {
            const row = document.createElement('tr');

            // Add item details to the row
            row.innerHTML = `
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td><button class="delete-button" data-index="${index}">Delete</button></td>
            `;

            // Add the row to the table
            cartItemsContainer.appendChild(row);

            // Add the price of this item to the total
            totalAmount += item.price * item.quantity;
        });

        // Display the total amount at the bottom of the table
        totalAmountContainer.innerText = `Total: $${totalAmount.toFixed(2)}`;

    } else {
        emptyMessage.style.display = 'block'; // Show the empty cart message
        cartTable.style.display = 'none'; // Hide the cart table
    }

    // Handle delete button click
    cartItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-button')) {
            const index = event.target.dataset.index; // Get the index of the item to delete

            // Remove the item from the cart array
            cart.splice(index, 1);

            // Update the cart in localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Reload the cart page to reflect the changes
            location.reload();
        }
    });

    // Handle checkout button click
    checkoutButton.addEventListener('click', () => {
        // Display thank you message
        alert('Thanks for your order!');

        // Clear the cart from localStorage
        localStorage.removeItem('cart');

        // Reload the page to reflect the empty cart
        location.reload();
    });
});
