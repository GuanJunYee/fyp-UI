// Profile management functions

// Update profile information
function updateProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('You must be logged in to update your profile');
        return;
    }
    
    const firstName = document.getElementById('profile-first-name').value.trim();
    const lastName = document.getElementById('profile-last-name').value.trim();
    const email = document.getElementById('profile-email').value.trim();
    const phone = document.getElementById('profile-phone').value.trim();
    const address = document.getElementById('profile-address').value.trim();
    const dob = document.getElementById('profile-dob').value.trim();
    const gender = document.getElementById('profile-gender').value;
    
    // Validation
    if (!firstName || !lastName || !email) {
        alert('Please fill in all required fields');
        return;
    }
    
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if email is already taken by another user
    const emailExists = users.some(user => user.email === email && user.id !== currentUser.id);
    if (emailExists) {
        alert('Email is already taken by another user');
        return;
    }
    
    // Update current user
    currentUser.firstName = firstName;
    currentUser.lastName = lastName;
    currentUser.name = `${firstName} ${lastName}`;
    currentUser.email = email;
    currentUser.phone = phone;
    currentUser.address = address;
    currentUser.dob = dob;
    currentUser.gender = gender;
    
    // Update user in users array
    const userIndex = users.findIndex(user => user.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex].firstName = firstName;
        users[userIndex].lastName = lastName;
        users[userIndex].name = `${firstName} ${lastName}`;
        users[userIndex].email = email;
        users[userIndex].phone = phone;
        users[userIndex].address = address;
        users[userIndex].dob = dob;
        users[userIndex].gender = gender;
    }
    
    // Save to localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('users', JSON.stringify(users));
    
    // Update UI
    document.getElementById('user-name').textContent = currentUser.name;
    document.getElementById('user-email').textContent = currentUser.email;
    
    // Update profile display elements if they exist
    const profileDisplayName = document.getElementById('profile-display-name');
    if (profileDisplayName) profileDisplayName.textContent = currentUser.name;
    
    alert('Profile updated successfully');
    
    // Add activity if in lecturer dashboard
    if (typeof addActivity === 'function') {
        addActivity('Updated profile information');
    }
}

// Change password
function changePassword() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('You must be logged in to change your password');
        return;
    }
    
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
        alert('Please fill in all password fields');
        return;
    }
    
    if (currentPassword !== currentUser.password) {
        alert('Current password is incorrect');
        return;
    }
    
    if (!isValidPassword(newPassword)) {
        alert('Password must be at least 6 characters long');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        alert('New passwords do not match');
        return;
    }
    
    // Update current user
    currentUser.password = newPassword;
    
    // Update user in users array
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex].password = newPassword;
    }
    
    // Save to localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('users', JSON.stringify(users));
    
    // Clear password fields
    document.getElementById('current-password').value = '';
    document.getElementById('new-password').value = '';
    document.getElementById('confirm-password').value = '';
    
    alert('Password changed successfully');
    
    // Add activity if in lecturer dashboard
    if (typeof addActivity === 'function') {
        addActivity('Changed password');
    }
}

// Update profile picture
function updateProfilePicture(input) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('You must be logged in to update your profile picture');
        return;
    }
    
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const profilePicture = e.target.result;
            
            // Update current user
            currentUser.profilePicture = profilePicture;
            
            // Update user in users array
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userIndex = users.findIndex(user => user.id === currentUser.id);
            if (userIndex !== -1) {
                users[userIndex].profilePicture = profilePicture;
            }
            
            // Save to localStorage
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            localStorage.setItem('users', JSON.stringify(users));
            
            // Update UI
            document.getElementById('profile-image').src = profilePicture;
            document.getElementById('user-avatar').src = profilePicture;
            
            alert('Profile picture updated successfully');
            
            // Add activity if in lecturer dashboard
            if (typeof addActivity === 'function') {
                addActivity('Updated profile picture');
            }
        };
        
        reader.readAsDataURL(input.files[0]);
    }
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate password strength
function isValidPassword(password) {
    return password.length >= 6; // Basic validation, can be enhanced
}