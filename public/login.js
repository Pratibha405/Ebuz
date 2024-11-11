// Function to show the notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;

    // Append the notification to the body
    document.body.appendChild(notification);

    // Automatically remove the notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000); // 3 seconds
}

// Function to update the login/logout button text
function updateLoginButton(isLoggedIn) {
    const loginButton = document.getElementById('loginButton');
    if (isLoggedIn) {
        loginButton.textContent = 'Logout';
        loginButton.onclick = logoutUser;
    } else {
        loginButton.textContent = 'Login';
        loginButton.onclick = showLoginForm;
    }
}

// Function to show the login form
function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signUpForm').style.display = 'none';
}

// Function to logout the user
function logoutUser() {
    // Clear any stored JWT token (if using localStorage)
    localStorage.removeItem('token');
    // Update the button text and behavior
    updateLoginButton(false);
    // Redirect to the login page
    window.location.href = '/login';
}

// Login validation function
function validateLogin(event) {
    event.preventDefault();  // Prevent form submission

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const data = { email, password };

    fetch('http://localhost:8008/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Login successful") {
            // Show the login success notification
            showNotification("Logged in successfully!");

            // Store the JWT token (if needed)
            localStorage.setItem('token', data.token);

            // Update the login button to show "Logout"
            updateLoginButton(true);

            // Redirect to the home page after 3 seconds
            setTimeout(() => {
                window.location.href = '../views/index.html';  // Redirect to the home page
            }, 3000); // Delay the redirect for 3 seconds
        } else {
            alert(data.message || "Invalid credentials");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred while logging in. Please try again.");
    });
}

// Sign-up validation function
function validateSignUp(event) {
    event.preventDefault();  // Prevent form submission

    // Collect form values
    const username = document.getElementById('signUpName').value;
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
  
    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return false;
    }
  
    // Create a payload
    const data = { username, email, password };
  
    // Send data via POST request
    fetch('http://localhost:8008/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === "Registration successful") {
        alert("Registration successful!");
        window.location.href = '../views/login.html';  // Redirect to the login page
      } else {
        alert(data.message || "An error occurred");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("There was an error with the registration. Please try again later.");
    });
}

// Check if the user is already logged in on page load
function checkLoginStatus() {
    const token = localStorage.getItem('token');
    if (token) {
        // User is logged in, update button to show "Logout"
        updateLoginButton(true);
    } else {
        // User is not logged in, show "Login" button
        updateLoginButton(false);
    }
}

// Call checkLoginStatus when the page loads
window.onload = function() {
    checkLoginStatus();

    // Attach event listeners to forms if not already attached
    const loginForm = document.getElementById('loginForm');
    const signUpForm = document.getElementById('signUpForm');

    if (loginForm) {
        loginForm.onsubmit = validateLogin;
    }

    if (signUpForm) {
        signUpForm.onsubmit = validateSignUp;
    }
};
