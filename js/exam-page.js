// Initialize exam page when document loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const user = checkAuth();
    if (!user || user.userType !== 'student') {
        window.location.href = 'index.html';
        return;
    }
    
    // Update user information in the UI
    updateUserInfo(user);
    
    // Load exam data
    loadExamData();
    
    // Initialize webcam
    initializeWebcam();
    
    // Start timer
    startExamTimer();
    
    // Update current date and time
    updateDateTime();
});

// Check if user is authenticated
function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        return null;
    }
    return currentUser;
}

// Update user information in the UI
function updateUserInfo(user) {
    document.getElementById('user-email').textContent = user.email;
    document.getElementById('user-avatar').src = user.profilePicture || 'https://via.placeholder.com/40';
}

// Load exam data from URL parameters or localStorage
/*
function loadExamData() {
    // Get exam ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const examId = urlParams.get('id');
    
    if (!examId) {
        alert('No exam specified');
        window.location.href = 'student-dashboard.html';
        return;
    }
    
    // Get mock data from localStorage
    const mockData = JSON.parse(localStorage.getItem('mockData')) || {};
    const availableExams = mockData.availableExams || [];
    
    // Find the exam
    const exam = availableExams.find(e => e.id === examId);
    
    if (!exam) {
        alert('Exam not found');
        window.location.href = 'student-dashboard.html';
        return;
    }
    
    // Get course information
    const enrolledCourses = mockData.enrolledCourses || [];
    const course = enrolledCourses.find(c => c.id === exam.courseId);
    
    // Update exam information in the UI
    document.getElementById('exam-title').textContent = exam.name;
    document.getElementById('exam-course').textContent = course ? course.name : 'Unknown Course';
    
    // Store exam data for later use
    window.currentExam = exam;
}*/

// Initialize webcam
function initializeWebcam() {
    const webcamFeed = document.getElementById('webcam-feed');
    
    // Check if browser supports getUserMedia
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Request access to webcam
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                // Create video element
                const video = document.createElement('video');
                video.srcObject = stream;
                video.autoplay = true;
                video.style.width = '100%';
                video.style.height = '100%';
                
                // Add video to webcam feed container
                webcamFeed.appendChild(video);
                
                // Store stream for later cleanup
                window.webcamStream = stream;
            })
            .catch(function(error) {
                console.error('Error accessing webcam:', error);
                webcamFeed.innerHTML = `
                    <div style="text-align: center; padding: 20px;">
                        <i class="fas fa-exclamation-triangle" style="font-size: 24px; color: #dc3545;"></i>
                        <p style="margin-top: 10px;">Unable to access webcam. Please ensure your camera is connected and you have granted permission.</p>
                    </div>
                `;
            });
    } else {
        webcamFeed.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <i class="fas fa-exclamation-triangle" style="font-size: 24px; color: #dc3545;"></i>
                <p style="margin-top: 10px;">Your browser does not support webcam access.</p>
            </div>
        `;
    }
}

// Start exam timer
function startExamTimer() {
    // Get exam duration from current exam data
    const duration = window.currentExam ? window.currentExam.duration : 120; // Default to 120 minutes if not specified
    
    // Convert duration to seconds
    let timeRemaining = duration * 60;
    
    // Update timer display
    updateTimerDisplay(timeRemaining);
    
    // Start countdown
    window.timerInterval = setInterval(function() {
        timeRemaining--;
        
        // Update timer display
        updateTimerDisplay(timeRemaining);
        
        // Check if time is up
        if (timeRemaining <= 0) {
            clearInterval(window.timerInterval);
            alert('Time is up! Your exam will be submitted automatically.');
            submitExam();
        }
    }, 1000);
}

// Update timer display
function updateTimerDisplay(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    // Format time as HH:MM:SS
    const timeString = [
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0'),
        secs.toString().padStart(2, '0')
    ].join(':');
    
    // Update timer display
    document.getElementById('timer-display').textContent = timeString;
    
    // Change color based on time remaining
    const timerDisplay = document.getElementById('timer-display');
    if (seconds < 300) { // Less than 5 minutes
        timerDisplay.style.color = '#dc3545'; // Red
    } else if (seconds < 600) { // Less than 10 minutes
        timerDisplay.style.color = '#ffc107'; // Yellow
    } else {
        timerDisplay.style.color = '#4a6cf7'; // Default blue
    }
}

// Update current date and time
function updateDateTime() {
    const dateTimeElement = document.getElementById('current-date-time');
    
    // Update initial date and time
    updateDateTimeDisplay();
    
    // Update date and time every minute
    setInterval(updateDateTimeDisplay, 60000);
    
    function updateDateTimeDisplay() {
        // Create a date object for April 3, 2025
        const fixedDate = new Date(2025, 3, 3); // Month is 0-indexed, so 3 = April
        
        // Get current time
        const now = new Date();
        
        // Set the time from current date to our fixed date
        fixedDate.setHours(now.getHours());
        fixedDate.setMinutes(now.getMinutes());
        
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        dateTimeElement.textContent = fixedDate.toLocaleDateString('en-US', options);
    }
}

// Handle file upload
function handleFileUpload(input) {
    const fileList = document.getElementById('file-list');
    
    // Clear file list if it's the first upload
    if (fileList.children.length === 0) {
        fileList.innerHTML = '';
    }
    
    // Process each selected file
    for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        
        // Create file item element
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <span>${file.name}</span>
            <button onclick="removeFile(this)" class="remove-file" data-filename="${file.name}">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add file item to file list
        fileList.appendChild(fileItem);
    }
    
    // Reset file input
    input.value = '';
}

// Remove file from list
function removeFile(button) {
    const fileItem = button.parentElement;
    fileItem.remove();
}

// Submit exam
function submitExam() {
    if (!confirm('Are you sure you want to submit your exam? This action cannot be undone.')) {
        return;
    }
    
    // Get all form data
    const formData = collectFormData();
    
    // In a real app, this would send the data to the server
    console.log('Submitting exam:', formData);
    
    // Create a submission record
    createSubmissionRecord();
    
    // Clean up resources
    cleanupResources();
    
    // Show success message and redirect
    alert('Your exam has been submitted successfully!');
    window.location.href = 'student-dashboard.html';
}

// Collect form data
function collectFormData() {
    const formData = {
        examId: window.currentExam ? window.currentExam.id : null,
        answers: {},
        files: []
    };
    
    // Collect answers from radio buttons and text areas
    const radioInputs = document.querySelectorAll('input[type="radio"]:checked');
    const textareas = document.querySelectorAll('textarea');
    
    radioInputs.forEach(input => {
        formData.answers[input.name] = input.value;
    });
    
    // For simplicity, we're just collecting the question number and text for textareas
    textareas.forEach((textarea, index) => {
        formData.answers[`essay_${index + 1}`] = textarea.value;
    });
    
    // Collect file names (in a real app, you would upload the files to the server)
    const fileItems = document.querySelectorAll('.file-item');
    fileItems.forEach(item => {
        const fileName = item.querySelector('span').textContent;
        formData.files.push(fileName);
    });
    
    return formData;
}

// Create submission record
function createSubmissionRecord() {
    if (!window.currentExam) return;
    
    // Get mock data from localStorage
    const mockData = JSON.parse(localStorage.getItem('mockData')) || {};
    const submissions = mockData.submissions || [];
    
    // Get current user
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    // Create new submission
    const newSubmission = {
        id: Date.now().toString(),
        examId: window.currentExam.id,
        studentId: currentUser ? currentUser.id : '1', // Default to first student if not available
        submissionDate: new Date().toISOString(),
        status: 'Submitted',
        plagiarismChecked: false,
        content: collectFormData() // Store the actual exam content for plagiarism checking
    };
    
    // Add to submissions array
    submissions.push(newSubmission);
    
    // Update mock data
    mockData.submissions = submissions;
    
    // Save to localStorage
    localStorage.setItem('mockData', JSON.stringify(mockData));
    
    console.log('Submission record created:', newSubmission);
}

// Clean up resources
function cleanupResources() {
    // Stop timer
    if (window.timerInterval) {
        clearInterval(window.timerInterval);
    }
    
    // Stop webcam stream
    if (window.webcamStream) {
        window.webcamStream.getTracks().forEach(track => track.stop());
    }
}

// Handle beforeunload event to warn user before leaving the page
window.addEventListener('beforeunload', function(e) {
    // Cancel the event
    e.preventDefault();
    // Chrome requires returnValue to be set
    e.returnValue = '';
});