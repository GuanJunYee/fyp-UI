// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const user = checkAuth();
    if (!user || user.userType !== 'student') {
        window.location.href = 'index.html';
        return;
    }
    
    // Update user information in the UI
    updateUserInfo(user);
    
    // Load dashboard data
    loadDashboardData();
});

// Update user information in the UI
function updateUserInfo(user) {
    document.getElementById('user-name').textContent = user.name;
    document.getElementById('user-email').textContent = user.email;
    document.getElementById('user-avatar').src = user.profilePicture || 'https://via.placeholder.com/40';
    document.getElementById('profile-image').src = user.profilePicture || 'https://via.placeholder.com/150';
    
    // Update profile form fields
    document.getElementById('profile-first-name').value = user.firstName || '';
    document.getElementById('profile-last-name').value = user.lastName || '';
    document.getElementById('profile-student-id').value = user.studentId || '';
    document.getElementById('profile-email').value = user.email || '';
    document.getElementById('profile-phone').value = user.phone || '';
    document.getElementById('profile-address').value = user.address || '';
    
    // Update profile display elements
    const profileDisplayName = document.getElementById('profile-display-name');
    const profileUserId = document.getElementById('profile-user-id');
    if (profileDisplayName) profileDisplayName.textContent = user.name || 'Student Name';
    if (profileUserId) profileUserId.textContent = user.id || '000000';
}

// Show the specified section and update the section title
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show the selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Add active class to the clicked menu item
    document.querySelector(`.menu-item[onclick="showSection('${sectionId}')"]`).classList.add('active');
    
    // Update section title
    const sectionTitle = document.querySelector(`.menu-item[onclick="showSection('${sectionId}')"]`).textContent.trim();
    document.getElementById('section-title').textContent = sectionTitle;
}

// Load dashboard data
function loadDashboardData() {
    // Load mock data (in a real app, this would come from an API)
    loadMockData();
    
    // Update dashboard stats
    updateDashboardStats();
    
    // Load upcoming exams
    loadUpcomingExams();
    
    // Load available exams
    loadAvailableExams();
    
    // Load enrolled courses
    loadEnrolledCourses();
    
    // Load exam schedule
    loadExamSchedule();
    
    // Load submissions
    loadSubmissions();
    
    // Load resubmission requests
    loadResubmissionRequests();
}

// Mock data for testing
let mockData = {
    upcomingExams: [],
    availableExams: [],
    enrolledCourses: [],
    examSchedule: [],
    submissions: [],
    resubmissionRequests: []
};

// Load mock data
function loadMockData() {
    // Check if mock data is already in localStorage
    const storedMockData = localStorage.getItem('mockData');
    if (storedMockData) {
        mockData = JSON.parse(storedMockData);
        return;
    }
    
    // Create mock data if not exists
    const courses = [
        { id: '1', name: 'Introduction to Computer Science', instructor: 'Dr. Smith' },
        { id: '2', name: 'Data Structures and Algorithms', instructor: 'Prof. Johnson' },
        { id: '3', name: 'Database Systems', instructor: 'Dr. Williams' },
        { id: '4', name: 'Software Engineering', instructor: 'Dr. Anderson' },
        { id: '5', name: 'Artificial Intelligence', instructor: 'Prof. Martinez' }
    ];
    
    // Get current date and time for the immediate exam
    const today = new Date();
    const currentDate = today.toISOString().split('T')[0];
    
    // Calculate start and end times for the immediate exam
    // Start time is current time
    let hours = today.getHours();
    let minutes = today.getMinutes();
    const startTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    
    // End time is 90 minutes from now
    const endTime = new Date(today.getTime() + 90 * 60000);
    const endHours = endTime.getHours();
    const endMinutes = endTime.getMinutes();
    const formattedEndTime = `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
    
    const exams = [
        {
            id: '1',
            name: 'Midterm Exam',
            courseId: '1',
            date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            startTime: '10:00',
            endTime: '12:00',
            duration: 120,
            location: 'Online',
            status: 'Upcoming'
        },
        {
            id: '2',
            name: 'Final Exam',
            courseId: '1',
            date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            startTime: '14:00',
            endTime: '17:00',
            duration: 180,
            location: 'Online',
            status: 'Upcoming'
        },
        {
            id: '3',
            name: 'Quiz 1',
            courseId: '2',
            date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            startTime: '09:00',
            endTime: '10:00',
            duration: 60,
            location: 'Online',
            status: 'Upcoming'
        },
        {
            id: '4',
            name: 'Practice Test',
            courseId: '3',
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            startTime: '13:00',
            endTime: '14:30',
            duration: 90,
            location: 'Online',
            status: 'Completed'
        },
        {
            id: '5',
            name: 'Pop Quiz - Available Now',
            courseId: '2',
            date: currentDate,
            startTime: startTime,
            endTime: formattedEndTime,
            duration: 90,
            location: 'Online',
            status: 'Available'
        },
        {
            id: '6',
            name: 'Database Final Exam',
            courseId: '3',
            date: currentDate,
            startTime: startTime,
            endTime: formattedEndTime,
            duration: 120,
            location: 'Online',
            status: 'Available'
        },
        {
            id: '7',
            name: 'Software Design Principles Quiz',
            courseId: '4',
            date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            startTime: '11:00',
            endTime: '12:30',
            duration: 90,
            location: 'Online',
            status: 'Completed'
        },
        {
            id: '8',
            name: 'AI Fundamentals Test',
            courseId: '5',
            date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            startTime: '15:00',
            endTime: '17:00',
            duration: 120,
            location: 'Online',
            status: 'Completed'
        },
        {
            id: '9',
            name: 'Machine Learning Midterm',
            courseId: '5',
            date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            startTime: '13:00',
            endTime: '15:00',
            duration: 120,
            location: 'Online',
            status: 'Upcoming'
        },
        {
            id: '10',
            name: 'Software Testing Exam',
            courseId: '4',
            date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            startTime: '10:00',
            endTime: '12:00',
            duration: 120,
            location: 'Online',
            status: 'Upcoming'
        }
    ];
    
    const submissions = [
        {
            id: '1',
            examId: '4',
            submissionDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'Graded',
            grade: '85/100',
            plagiarismChecked: true,
            similarityScore: 12,
            behaviorFlags: [
                { timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 15 * 60000).toISOString(), behavior: 'Looking away from screen', severity: 'low' }
            ]
        },
        {
            id: '2',
            examId: '7',
            submissionDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'Graded',
            grade: '92/100',
            plagiarismChecked: true,
            similarityScore: 5,
            behaviorFlags: []
        },
        {
            id: '3',
            examId: '8',
            submissionDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'Graded',
            grade: '78/100',
            plagiarismChecked: true,
            similarityScore: 28,
            behaviorFlags: [
                { timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000 + 25 * 60000).toISOString(), behavior: 'Multiple people detected', severity: 'high' },
                { timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000 + 40 * 60000).toISOString(), behavior: 'Attempted to switch application', severity: 'high' }
            ]
        }
    ];
    
    // Assign courses and exams to mock data
    mockData.enrolledCourses = courses;
    mockData.availableExams = exams;
    mockData.upcomingExams = exams.filter(exam => exam.status === 'Upcoming');
    mockData.examSchedule = exams;
    mockData.submissions = submissions;
    // Add resubmission requests
    mockData.resubmissionRequests = [
        {
            id: '1',
            submissionId: '3',
            examId: '8',
            requestDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
            reason: 'Technical issues during submission - my internet connection was unstable',
            status: 'Approved',
            responseDate: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
            responseMessage: 'Request approved. You may resubmit within 48 hours.'
        },
        {
            id: '2',
            submissionId: '1',
            examId: '4',
            requestDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
            reason: 'I accidentally submitted before completing all questions',
            status: 'Pending',
            responseDate: null,
            responseMessage: null
        }
    ];
    
    // Save to localStorage
    localStorage.setItem('mockData', JSON.stringify(mockData));
}

// Update dashboard stats
function updateDashboardStats() {
    const upcomingExams = mockData.upcomingExams.length;
    const completedExams = mockData.submissions.length;
    const enrolledCourses = mockData.enrolledCourses.length;
    
    document.getElementById('upcoming-exams-count').textContent = upcomingExams;
    document.getElementById('completed-exams-count').textContent = completedExams;
    document.getElementById('courses-count').textContent = enrolledCourses;
}

// Load upcoming exams
function loadUpcomingExams() {
    const tableBody = document.querySelector('#upcoming-exams-table tbody');
    tableBody.innerHTML = '';
    
    if (mockData.upcomingExams.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="5">No upcoming exams</td>';
        tableBody.appendChild(row);
        return;
    }
    
    mockData.upcomingExams.forEach(exam => {
        const course = mockData.enrolledCourses.find(course => course.id === exam.courseId);
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${exam.name}</td>
            <td>${course ? course.name : 'Unknown Course'}</td>
            <td>${exam.date}</td>
            <td>${exam.startTime} - ${exam.endTime}</td>
            <td>
                <button class="action-btn" onclick="viewExamDetails('${exam.id}')">View Details</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Load available exams
function loadAvailableExams() {
    const tableBody = document.querySelector('#available-exams-table tbody');
    tableBody.innerHTML = '';
    
    if (mockData.availableExams.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="6">No available exams</td>';
        tableBody.appendChild(row);
        return;
    }
    
    mockData.availableExams.forEach(exam => {
        const course = mockData.enrolledCourses.find(course => course.id === exam.courseId);
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${exam.name}</td>
            <td>${course ? course.name : 'Unknown Course'}</td>
            <td>${exam.date}</td>
            <td>${exam.duration} minutes</td>
            <td>${exam.status}</td>
            <td>
                <button class="action-btn" onclick="viewExamDetails('${exam.id}')">View Details</button>
                ${exam.status === 'Upcoming' ? `<button class="action-btn" onclick="enrollExam('${exam.id}')">Enroll</button>` : ''}
                ${exam.status === 'Available' ? `<button class="action-btn join-exam-btn" onclick="startExam('${exam.id}')">Join</button>` : ''}
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Load enrolled courses
function loadEnrolledCourses() {
    const tableBody = document.querySelector('#enrolled-courses-table tbody');
    tableBody.innerHTML = '';
    
    if (mockData.enrolledCourses.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="4">No enrolled courses</td>';
        tableBody.appendChild(row);
        return;
    }
    
    mockData.enrolledCourses.forEach(course => {
        const courseExams = mockData.availableExams.filter(exam => exam.courseId === course.id).length;
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${course.name}</td>
            <td>${course.instructor}</td>
            <td>${courseExams}</td>
            <td>
                <button class="action-btn" onclick="viewCourseExams('${course.id}')">View Exams</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Load exam schedule
function loadExamSchedule() {
    const tableBody = document.querySelector('#exam-schedule-table tbody');
    tableBody.innerHTML = '';
    
    if (mockData.examSchedule.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="7">No scheduled exams</td>';
        tableBody.appendChild(row);
        return;
    }
    
    // Sort exams by date from soonest to latest
    const sortedExams = [...mockData.examSchedule].sort((a, b) => {
        const dateA = new Date(a.date + 'T' + a.startTime);
        const dateB = new Date(b.date + 'T' + b.startTime);
        return dateA - dateB;
    });
    
    sortedExams.forEach(exam => {
        const course = mockData.enrolledCourses.find(course => course.id === exam.courseId);
        const row = document.createElement('tr');
        
        // Get current date to compare with exam date
        const currentDate = new Date();
        
        // Ensure proper date parsing by using a standardized format
        // This fixes potential issues with different date formats
        const examDate = new Date(exam.date + 'T' + exam.startTime);
        
        // Check if exam is available to join (same day and within time window or has 'Available' status)
        const isExamAvailable = (examDate > currentDate && 
                               examDate.getTime() - currentDate.getTime() < 30 * 60 * 1000) || // 30 minutes before start
                               exam.status === 'Available'; // Also enable for exams with 'Available' status
        
        row.innerHTML = `
            <td>${exam.name}</td>
            <td>${course ? course.name : 'Unknown Course'}</td>
            <td>${exam.date}</td>
            <td>${exam.startTime}</td>
            <td>${exam.endTime}</td>
            <td>${exam.location}</td>
            <td>
                ${isExamAvailable ? 
                  `<button class="action-btn join-exam-btn" onclick="startExam('${exam.id}')">Join</button>` : 
                  `<button class="action-btn join-exam-btn" disabled>Join</button>`}
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Load submissions
function loadSubmissions() {
    const tableBody = document.querySelector('#submissions-table tbody');
    tableBody.innerHTML = '';
    
    if (mockData.submissions.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="5">No submissions</td>';
        tableBody.appendChild(row);
        return;
    }
    
    mockData.submissions.forEach(submission => {
        const exam = mockData.availableExams.find(exam => exam.id === submission.examId);
        if (!exam) return;
        
        const course = mockData.enrolledCourses.find(course => course.id === exam.courseId);
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${exam.name}</td>
            <td>${course ? course.name : 'Unknown Course'}</td>
            <td>${new Date(submission.submissionDate).toLocaleString()}</td>
            <td>${submission.status}</td>
            <td>
                <button class="action-btn" onclick="viewSubmission('${submission.id}')">View</button>
                <button class="action-btn" onclick="requestResubmission('${submission.id}')">Request Resubmission</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Load resubmission requests
function loadResubmissionRequests() {
    const tableBody = document.querySelector('#resubmission-requests-table tbody');
    tableBody.innerHTML = '';
    
    if (mockData.resubmissionRequests.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="4">No resubmission requests</td>';
        tableBody.appendChild(row);
        return;
    }
    
    mockData.resubmissionRequests.forEach(request => {
        const submission = mockData.submissions.find(sub => sub.id === request.submissionId);
        if (!submission) return;
        
        const exam = mockData.availableExams.find(exam => exam.id === submission.examId);
        if (!exam) return;
        
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${exam.name}</td>
            <td>${new Date(request.requestDate).toLocaleString()}</td>
            <td>${request.reason}</td>
            <td>${request.status}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

// View exam details
function viewExamDetails(examId) {
    const exam = mockData.availableExams.find(exam => exam.id === examId);
    if (!exam) return;
    
    const course = mockData.enrolledCourses.find(course => course.id === exam.courseId);
    
    document.getElementById('exam-modal-title').textContent = exam.name;
    
    const examDetails = document.getElementById('exam-details');
    examDetails.innerHTML = `
        <div class="exam-info">
            <p><strong>Course:</strong> ${course ? course.name : 'Unknown Course'}</p>
            <p><strong>Date:</strong> ${exam.date}</p>
            <p><strong>Time:</strong> ${exam.startTime} - ${exam.endTime}</p>
            <p><strong>Duration:</strong> ${exam.duration} minutes</p>
            <p><strong>Location:</strong> ${exam.location}</p>
            <p><strong>Status:</strong> ${exam.status}</p>
        </div>
        <div class="exam-instructions">
            <h3>Instructions:</h3>
            <ul>
                <li>Make sure you have a stable internet connection.</li>
                <li>Ensure your webcam is working properly.</li>
                <li>You cannot switch to other applications during the exam.</li>
                <li>Keep your face visible to the camera at all times.</li>
                <li>Submit your answers before the time limit expires.</li>
            </ul>
        </div>
    `;
    
    // Show or hide start exam button based on exam status
    const startExamBtn = document.getElementById('start-exam-btn');
    if (exam.status === 'Upcoming' || exam.status === 'Available') {
        startExamBtn.style.display = 'block';
        startExamBtn.setAttribute('data-exam-id', examId);
        
        // Change button text based on status
        if (exam.status === 'Available') {
            startExamBtn.textContent = 'Join Exam Now';
        } else {
            startExamBtn.textContent = 'Start Exam';
        }
    } else {
        startExamBtn.style.display = 'none';
    }
    
    // Show modal
    document.getElementById('exam-modal').style.display = 'flex';
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Enroll in exam
function enrollExam(examId) {
    const exam = mockData.availableExams.find(exam => exam.id === examId);
    if (!exam) return;
    
    // In a real app, this would make an API call to enroll the student
    alert(`You have successfully enrolled in ${exam.name}`);
    
    // Refresh exams list
    refreshExams();
}

// Refresh exams
function refreshExams() {
    // In a real app, this would fetch updated data from the server
    loadAvailableExams();
}

// View course exams
function viewCourseExams(courseId) {
    // Filter exams by course
    const courseExams = mockData.availableExams.filter(exam => exam.courseId === courseId);
    
    // Update available exams table to show only course exams
    const tableBody = document.querySelector('#available-exams-table tbody');
    tableBody.innerHTML = '';
    
    if (courseExams.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="6">No exams for this course</td>';
        tableBody.appendChild(row);
    } else {
        courseExams.forEach(exam => {
            const course = mockData.enrolledCourses.find(course => course.id === exam.courseId);
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${exam.name}</td>
                <td>${course ? course.name : 'Unknown Course'}</td>
                <td>${exam.date}</td>
                <td>${exam.duration} minutes</td>
                <td>${exam.status}</td>
                <td>
                    <button class="action-btn" onclick="viewExamDetails('${exam.id}')">View Details</button>
                    ${exam.status === 'Upcoming' ? `<button class="action-btn" onclick="enrollExam('${exam.id}')">Enroll</button>` : ''}
                </td>
            `;
            
            tableBody.appendChild(row);
        });
    }
    
    // Switch to My Exams section
    showSection('my-exams');
}

// Print timetable
function printTimetable() {
    // Create a printable version of the timetable
    const printContent = document.getElementById('exam-schedule').cloneNode(true);
    
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>Exam Timetable</title>
                <style>
                    body { font-family: Arial, sans-serif; }
                    table { width: 100%; border-collapse: collapse; }
                    th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
                    th { background-color: #f2f2f2; }
                    h2 { margin-bottom: 20px; }
                </style>
            </head>
            <body>
                <h2>Exam Timetable</h2>
                ${printContent.querySelector('table').outerHTML}
            </body>
        </html>
    `);
    
    // Print the window
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
}

// View submission
function viewSubmission(submissionId) {
    const submission = mockData.submissions.find(sub => sub.id === submissionId);
    if (!submission) return;
    
    const exam = mockData.availableExams.find(exam => exam.id === submission.examId);
    if (!exam) return;
    
    // In a real app, this would show the submission details
    alert(`Viewing submission for ${exam.name}`);
}

// Request resubmission
function requestResubmission(submissionId) {
    const submission = mockData.submissions.find(sub => sub.id === submissionId);
    if (!submission) return;
    
    // Set submission ID in the form
    document.getElementById('resubmission-exam-id').value = submission.examId;
    
    // Show resubmission modal
    document.getElementById('resubmission-modal').style.display = 'flex';
}

// Submit resubmission request
function submitResubmissionRequest() {
    const examId = document.getElementById('resubmission-exam-id').value;
    const reason = document.getElementById('resubmission-reason').value.trim();
    
    if (!reason) {
        alert('Please provide a reason for resubmission');
        return;
    }
    
    const submission = mockData.submissions.find(sub => sub.examId === examId);
    if (!submission) {
        closeModal('resubmission-modal');
        return;
    }
    
    // Create resubmission request
    const request = {
        id: Date.now().toString(),
        submissionId: submission.id,
        requestDate: new Date().toISOString(),
        reason: reason,
        status: 'Pending'
    };
    
    // Add to mock data
    mockData.resubmissionRequests.push(request);
    
    // Save to localStorage
    localStorage.setItem('mockData', JSON.stringify(mockData));
    
    // Reload resubmission requests
    loadResubmissionRequests();
    
    // Close modal
    closeModal('resubmission-modal');
    
    alert('Resubmission request submitted successfully');
}

// Start exam
function startExam(examId) {
    // If no examId is provided, try to get it from the button attribute
    if (!examId) {
        examId = document.getElementById('start-exam-btn').getAttribute('data-exam-id');
    }
    
    const exam = mockData.availableExams.find(exam => exam.id === examId);
    if (!exam) return;
    
    // Confirm that the student wants to start the exam
    if (confirm(`Are you ready to start ${exam.name}?\n\nYour webcam will be activated and your screen will be monitored during the exam.`)) {
        // Redirect to exam page
        window.location.href = `exam-page.html?id=${examId}`;
    }
}

// Save profile changes
function saveProfile() {
    const name = document.getElementById('profile-name').value.trim();
    const email = document.getElementById('profile-email').value.trim();
    
    if (!name || !email) {
        alert('Please fill in all fields');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Update profile
    const updated = updateProfile({
        name: name,
        email: email
    });
    
    if (updated) {
        alert('Profile updated successfully');
        // Refresh user info
        updateUserInfo(JSON.parse(localStorage.getItem('currentUser')));
    } else {
        alert('Failed to update profile');
    }
}

// Update profile picture
function updateProfilePicture(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const profileImage = document.getElementById('profile-image');
            const userAvatar = document.getElementById('user-avatar');
            
            profileImage.src = e.target.result;
            userAvatar.src = e.target.result;
            
            // Update profile
            updateProfile({
                profilePicture: e.target.result
            });
        };
        
        reader.readAsDataURL(input.files[0]);
    }
}

// Change password handler
function changePasswordHandler() {
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    if (!currentPassword || !newPassword || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        alert('New passwords do not match');
        return;
    }
    
    if (!isValidPassword(newPassword)) {
        alert('Password must be at least 6 characters long');
        return;
    }
    
    // Change password
    const changed = changePassword(currentPassword, newPassword);
    
    if (changed) {
        alert('Password changed successfully');
        // Clear form
        document.getElementById('password-form').reset();
    } else {
        alert('Current password is incorrect');
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