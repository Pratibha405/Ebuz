function showSignUp() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("signUpForm").style.display = "block";
}

function showLogin() {
    document.getElementById("signUpForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
}

// Simple validation function placeholders (expand as needed)
function validateLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Here you can add logic to confirm user's email and password.
    // For demonstration, let's assume any non-empty email and password mean success.
    if (email && password) {
        // Redirect to index.html upon successful login
        window.location.href = "index.html";
        return false; // Prevent form submission (if it's originally a submit button)
    }

    // If validation fails (optional)
    alert("Please enter a valid email and password.");
    return false; // Prevent form submission for demo purposes
}


function validateSignUp() {
    // Get the input field values
    const name = document.getElementById("signUpName").value;
    const email = document.getElementById("signUpEmail").value;
    const password = document.getElementById("signUpPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Check if all fields are filled
    if (areFieldsFilled([name, email, password, confirmPassword])) {
        // Check if the password and confirm password match
        if (password !== confirmPassword) {
            alert("Passwords do not match. Please try again.");
            return false; // Prevent form submission
        }
         // Show confirmation message
        alert("Thank you for signing up, " + name + "!");

         // Optional: Redirect after a delay to ensure the alert is seen
         setTimeout(() => {
             window.location.href = "index.html"; // Redirect to your desired page
         }, 1000); // Delay of 3 seconds

        return false; // Prevent form submission (for demo purposes)
    }

    // If validation fails, show an error message
    alert("Please fill in all fields.");
    return false; // Prevent form submission
}

function areFieldsFilled(fields) {
    // Check if all fields are non-empty
    return fields.every(field => field.trim() !== "");
}
