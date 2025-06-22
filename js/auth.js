// User data storage (in a real application, this would be a database)
let users = JSON.parse(localStorage.getItem('users')) || [];

// Initialize mock users if none exist
function initializeMockUsers() {
    if (users.length === 0) {
        // Create a mock student user
        const studentUser = {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            name: 'John Doe',
            studentId: '123456',
            email: 'john.doe@example.com',
            phone: '1234567890',
            password: 'password123',
            userType: 'student',
            profilePicture: 'https://via.placeholder.com/150',
            createdAt: new Date().toISOString()
        };
        
        // Create a mock lecturer user
        const lecturerUser = {
            id: '2',
            firstName: 'Jane',
            lastName: 'Smith',
            name: 'Jane Smith',
            studentId: '654321',
            email: 'jane.smith@example.com',
            phone: '0987654321',
            password: 'password123',
            userType: 'lecturer',
            profilePicture: 'https://via.placeholder.com/150',
            createdAt: new Date().toISOString()
        };
        
        // Add users to the array
        users.push(studentUser, lecturerUser);
        
        // Save to localStorage
        localStorage.setItem('users', JSON.stringify(users));
        
        console.log('Mock users initialized');
    }
}
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Initialize mock users when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeMockUsers();
});

// Show the specified tab content
function showTab(tabId) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show the selected tab content
    document.getElementById(tabId).classList.add('active');
    
    // Add active class to the clicked tab button (except for forgot password)
    if (tabId === 'login' || tabId === 'register') {
        document.querySelector(`.tab-btn[onclick="showTab('${tabId}')"]`).classList.add('active');
    }
}

// Show forgot password form
function showForgotPassword() {
    showTab('forgot-password');
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate student ID format (6 digits)
function isValidStudentId(studentId) {
    const studentIdRegex = /^\d{6}$/;
    return studentIdRegex.test(studentId);
}

// Validate password strength
function isValidPassword(password) {
    return password.length >= 6; // Basic validation, can be enhanced
}

// Multi-step registration functions
let currentStep = 1;
const totalSteps = 3;

// Move to the next step in registration
function nextStep(step) {
    // Validate current step before proceeding
    if (!validateStep(step)) {
        return false;
    }
    
    // Hide current step
    document.getElementById(`step-${step}`).classList.remove('active');
    
    // Show next step
    document.getElementById(`step-${step + 1}`).classList.add('active');
    
    // Update progress bar
    updateProgressBar(step + 1);
    
    // Update current step
    currentStep = step + 1;
    
    return true;
}

// Move to the previous step in registration
function prevStep(step) {
    // Hide current step
    document.getElementById(`step-${step}`).classList.remove('active');
    
    // Show previous step
    document.getElementById(`step-${step - 1}`).classList.add('active');
    
    // Update progress bar
    updateProgressBar(step - 1);
    
    // Update current step
    currentStep = step - 1;
    
    return true;
}

// Update the progress bar
function updateProgressBar(step) {
    // Update progress bar fill width
    const progressPercentage = ((step - 1) / (totalSteps - 1)) * 100;
    document.getElementById('progress-fill').style.width = `${progressPercentage}%`;
    
    // Update step status
    document.querySelectorAll('.progress-step').forEach((stepEl, index) => {
        const stepNum = index + 1;
        
        // Remove all status classes
        stepEl.classList.remove('active', 'completed');
        
        // Add appropriate class
        if (stepNum === step) {
            stepEl.classList.add('active');
        } else if (stepNum < step) {
            stepEl.classList.add('completed');
        }
    });
}

// Validate each step
function validateStep(step) {
    switch(step) {
        case 1: // Account Information
            const studentId = document.getElementById('register-student-id').value.trim();
            const email = document.getElementById('register-email').value.trim();
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            
            if (!studentId || !email || !password || !confirmPassword) {
                alert('Please fill in all required fields');
                return false;
            }
            
            if (!isValidStudentId(studentId)) {
                alert('Please enter a valid 6-digit Student ID');
                return false;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address');
                return false;
            }
            
            if (!isValidPassword(password)) {
                alert('Password must be at least 6 characters long');
                return false;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return false;
            }
            
            // Check if user already exists
            if (users.some(user => user.studentId === studentId)) {
                alert('Student ID already registered');
                return false;
            }
            
            if (users.some(user => user.email === email)) {
                alert('Email already registered');
                return false;
            }
            
            return true;
            
        case 2: // Personal Information
            const firstName = document.getElementById('register-first-name').value.trim();
            const lastName = document.getElementById('register-last-name').value.trim();
            
            if (!firstName || !lastName) {
                alert('Please fill in all required fields');
                return false;
            }
            
            return true;
            
        default:
            return true;
    }
}

// Show registration complete message
function showRegistrationComplete() {
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(step => {
        step.style.display = 'none';
    });
    
    // Hide progress bar
    document.querySelector('.progress-container').style.display = 'none';
    
    // Show completion message
    document.getElementById('registration-complete').style.display = 'block';
}

// Register a new user
function register() {
    // Get all form values
    const firstName = document.getElementById('register-first-name').value.trim();
    const lastName = document.getElementById('register-last-name').value.trim();
    const studentId = document.getElementById('register-student-id').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const phone = document.getElementById('register-phone').value.trim();
    const password = document.getElementById('register-password').value;
    // Force userType to be 'student' for public registration
    const userType = 'student';
    
    // Create new user
    const newUser = {
        id: Date.now().toString(),
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        studentId,
        email,
        phone,
        password, // In a real app, this would be hashed
        userType,
        profilePicture: 'https://via.placeholder.com/150',
        createdAt: new Date().toISOString()
    };
    
    // Add to users array
    users.push(newUser);
    
    // Save to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    // Show completion message
    showRegistrationComplete();
    
    // Return false to prevent form submission
    return false;
}

// Login user
function login() {
    const userId = document.getElementById('login-user-id').value.trim();
    const password = document.getElementById('login-password').value;
    
    // Validation
    if (!userId || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    if (!isValidStudentId(userId)) {
        alert('Please enter a valid 6-digit Student ID');
        return;
    }
    
    // First, try to find user in the main users array
    let user = users.find(user => user.studentId === userId);
    
    // If not found, check if lecturer mock data exists and try to find there
    if (!user) {
        const lecturerMockData = JSON.parse(localStorage.getItem('lecturerMockData'));
        if (lecturerMockData && lecturerMockData.users) {
            // Try to find by email that matches the pattern of studentId@example.com
            const potentialEmail = `${userId}@example.com`;
            user = lecturerMockData.users.find(u => u.email === potentialEmail);
            
            // If not found by email pattern, try other methods
            if (!user) {
                // For demo purposes, allow login with any lecturer account using studentId
                user = lecturerMockData.users.find(u => u.userType === 'lecturer');
                if (user) {
                    // Temporarily assign the studentId to this user for login purposes
                    user.studentId = userId;
                }
            }
        }
    }
    
    if (!user) {
        alert('Invalid Student ID or password');
        return;
    }
    
    // Check password (for demo, accept 'password123' for all accounts)
    if (user.password !== password && password !== 'password123') {
        alert('Invalid Student ID or password');
        return;
    }
    
    // Set current user
    currentUser = {
        id: user.id,
        name: user.name || (user.firstName ? `${user.firstName} ${user.lastName}` : 'User'),
        email: user.email,
        userType: user.userType,
        profilePicture: user.profilePicture || 'https://via.placeholder.com/150'
    };
    
    // Save to localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Redirect to appropriate dashboard
    if (user.userType === 'lecturer') {
        window.location.href = 'lecturer-dashboard.html';
    } else {
        window.location.href = 'student-dashboard.html';
    }
}

// Store OTP information
let otpData = {
    email: null,
    otp: null,
    expiresAt: null
};

// Request OTP for password reset
function requestOTP() {
    const email = document.getElementById('forgot-email').value.trim();
    
    // Validation
    if (!email) {
        alert('Please enter your email address');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Check if user exists with this email
    let userExists = users.some(user => user.email === email);
    
    // If not found, check lecturer mock data
    if (!userExists) {
        const lecturerMockData = JSON.parse(localStorage.getItem('lecturerMockData'));
        if (lecturerMockData && lecturerMockData.users) {
            userExists = lecturerMockData.users.some(u => u.email === email);
        }
    }
    
    if (!userExists) {
        alert('No account found with this email address');
        return;
    }
    
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP data (in a real app, this would be stored server-side)
    otpData = {
        email: email,
        otp: otp,
        expiresAt: new Date(Date.now() + 10 * 60000) // OTP valid for 10 minutes
    };
    
    // In a real application, this would send the OTP to the user's email
    alert(`For demo purposes, your OTP is: ${otp}\nIn a real application, this would be sent to your email.`);
    
    // Show OTP verification form
    showTab('verify-otp');
}

// Verify OTP and reset password
function verifyOTP() {
    const otpCode = document.getElementById('otp-code').value.trim();
    const newPassword = document.getElementById('new-password').value;
    const confirmNewPassword = document.getElementById('confirm-new-password').value;
    
    // Validation
    if (!otpCode || !newPassword || !confirmNewPassword) {
        alert('Please fill in all fields');
        return;
    }
    
    if (newPassword !== confirmNewPassword) {
        alert('Passwords do not match');
        return;
    }
    
    if (!isValidPassword(newPassword)) {
        alert('Password must be at least 6 characters long');
        return;
    }
    
    // Check if OTP is valid
    if (!otpData.otp || otpData.otp !== otpCode) {
        alert('Invalid OTP code');
        return;
    }
    
    // Check if OTP is expired
    if (new Date() > new Date(otpData.expiresAt)) {
        alert('OTP has expired. Please request a new one.');
        showTab('forgot-password');
        return;
    }
    
    // Find user with the email
    let userIndex = users.findIndex(user => user.email === otpData.email);
    let userFound = false;
    
    if (userIndex !== -1) {
        // Update password in main users array
        users[userIndex].password = newPassword;
        userFound = true;
    } else {
        // Check lecturer mock data
        const lecturerMockData = JSON.parse(localStorage.getItem('lecturerMockData'));
        if (lecturerMockData && lecturerMockData.users) {
            const lecturerIndex = lecturerMockData.users.findIndex(u => u.email === otpData.email);
            
            if (lecturerIndex !== -1) {
                lecturerMockData.users[lecturerIndex].password = newPassword;
                localStorage.setItem('lecturerMockData', JSON.stringify(lecturerMockData));
                userFound = true;
            }
        }
    }
    
    if (!userFound) {
        alert('Error updating password. User not found.');
        return;
    }
    
    // Save changes to main users array if needed
    if (userIndex !== -1) {
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    // Clear OTP data
    otpData = {
        email: null,
        otp: null,
        expiresAt: null
    };
    
    alert('Password has been reset successfully!');
    showTab('login');
}

// Logout user
function logout() {
    // Clear current user
    currentUser = null;
    localStorage.removeItem('currentUser');
    
    // Redirect to login page
    window.location.href = 'index.html';
}

// Check if user is logged in (for protected pages)
function checkAuth() {
    if (!currentUser) {
        window.location.href = 'index.html';
    }
    return currentUser;
}

// Update user profile
function updateProfile(userData) {
    if (!currentUser) return false;
    
    // Find user index
    const userIndex = users.findIndex(user => user.id === currentUser.id);
    
    if (userIndex === -1) return false;
    
    // Update user data
    users[userIndex] = { ...users[userIndex], ...userData };
    
    // Update current user
    currentUser = { ...currentUser, ...userData };
    
    // Save changes
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    return true;
}

// Change password
function changePassword(oldPassword, newPassword) {
    if (!currentUser) return false;
    
    // Find user
    const userIndex = users.findIndex(user => user.id === currentUser.id);
    
    if (userIndex === -1) return false;
    
    // Verify old password
    if (users[userIndex].password !== oldPassword) {
        return false;
    }
    
    // Update password
    users[userIndex].password = newPassword;
    
    // Save changes
    localStorage.setItem('users', JSON.stringify(users));
    
    return true;
}

// Admin functions for lecturer

// Get all users (for lecturer)
function getAllUsers() {
    // Only return non-sensitive data
    return users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        profilePicture: user.profilePicture,
        createdAt: user.createdAt
    }));
}

// Delete user (for lecturer)
function deleteUser(userId) {
    const initialLength = users.length;
    users = users.filter(user => user.id !== userId);
    
    if (users.length < initialLength) {
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    }
    
    return false;
}

// Update user (for lecturer)
function updateUser(userId, userData) {
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex === -1) return false;
    
    // Update user data (except password)
    users[userIndex] = { 
        ...users[userIndex], 
        ...userData,
        password: users[userIndex].password // Preserve original password
    };
    
    // Save changes
    localStorage.setItem('users', JSON.stringify(users));
    
    return true;
}