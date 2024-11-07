// main.js
document.addEventListener('DOMContentLoaded', function () {
    console.log("Welcome to Book & Sip Studio!");
});

function AddToCart(item) {
    addToCart(item);
}

function logout() {
    // Implement your logout logic here
    alert("You have been logged out.");
    // Optionally, redirect to a login page or home page
    window.location.href = "login.html"; // Change as needed
}

function toggleDescription(bookId) {
    const description = document.getElementById(bookId);
    if (description.style.display === "none") {
        description.style.display = "block";
    } else {
        description.style.display = "none";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const coffeeOffers = document.getElementById('coffeeOffers');
    const coffeeDropdown = document.getElementById('coffeeDropdown');

    coffeeOffers.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior
        coffeeDropdown.style.display = (coffeeDropdown.style.display === 'block') ? 'none' : 'block'; // Toggle dropdown
    });

    // Close the dropdown when clicking outside of it
    document.addEventListener('click', function(event) {
        if (!coffeeOffers.contains(event.target) && !coffeeDropdown.contains(event.target)) {
            coffeeDropdown.style.display = 'none'; // Hide dropdown
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});