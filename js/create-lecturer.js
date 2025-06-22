// Script to create a lecturer account directly
// This page should only be accessible to existing lecturers

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate ID format (6 digits)
function isValidId(id) {
    const idRegex = /^\d{6}$/;
    return idRegex.test(id);
}

// Validate password strength
function isValidPassword(password) {
    return password.length >= 6; // Basic validation, can be enhanced
}

// Function to create a lecturer account
function createLecturerAccount() {
    // Get form values
    const firstName = document.getElementById('lecturer-first-name').value.trim();
    const lastName = document.getElementById('lecturer-last-name').value.trim();
    const lecturerId = document.getElementById('lecturer-id').value.trim();
    const email = document.getElementById('lecturer-email').value.trim();
    const phone = document.getElementById('lecturer-phone').value.trim();
    const password = document.getElementById('lecturer-password').value;
    const confirmPassword = document.getElementById('lecturer-confirm-password').value;
    
    // Validation
    if (!firstName || !lastName || !lecturerId || !email || !password || !confirmPassword) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (!isValidId(lecturerId)) {
        alert('Please enter a valid 6-digit Lecturer ID');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    if (!isValidPassword(password)) {
        alert('Password must be at least 6 characters long');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    // Get users from localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if the lecturer account already exists
    if (users.some(user => user.studentId === lecturerId)) {
        alert('Lecturer ID already registered');
        return;
    }
    
    if (users.some(user => user.email === email)) {
        alert('Email already registered');
        return;
    }
    
    // Create new lecturer user
    const lecturerUser = {
        id: Date.now().toString(),
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        studentId: lecturerId, // Using studentId field for consistency with existing code
        email,
        phone,
        password, // In a real app, this would be hashed
        userType: 'lecturer',
        profilePicture: 'https://via.placeholder.com/150',
        createdAt: new Date().toISOString()
    };
    
    // Add to users array
    users.push(lecturerUser);
    
    // Save to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Lecturer account created successfully! You can now log in.');
    window.location.href = 'index.html';
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Check if the current user is a lecturer
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser || currentUser.userType !== 'lecturer') {
        // If not a lecturer, redirect to login page
        alert('You must be logged in as a lecturer to access this page.');
        window.location.href = 'index.html';
        return;
    }
    
    // Display the current user's name
    document.getElementById('current-user').textContent = currentUser.name;
    
    // Set up event listener for the form submission
    document.getElementById('create-lecturer-form').addEventListener('submit', function(e) {
        e.preventDefault();
        createLecturerAccount();
    });
});