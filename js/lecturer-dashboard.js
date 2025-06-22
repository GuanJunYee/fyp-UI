// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const user = checkAuth();
    if (!user || user.userType !== 'lecturer') {
        window.location.href = 'index.html';
        return;
    }
    
    // Update user information in the UI
    updateUserInfo(user);
    
    // Load dashboard data
    loadDashboardData();
    
    // Initialize modals
    initializeModals();
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
    document.getElementById('user-name').textContent = user.name;
    document.getElementById('user-email').textContent = user.email;
    document.getElementById('user-avatar').src = user.profilePicture || 'https://via.placeholder.com/40';
    
    // Update profile section if it exists
    const profileImage = document.getElementById('profile-image');
    const profileFirstName = document.getElementById('profile-first-name');
    const profileLastName = document.getElementById('profile-last-name');
    const profileEmail = document.getElementById('profile-email');
    const profilePhone = document.getElementById('profile-phone');
    const profileAddress = document.getElementById('profile-address');
    const profileDob = document.getElementById('profile-dob');
    const profileGender = document.getElementById('profile-gender');
    const profileDisplayName = document.getElementById('profile-display-name');
    const profileUserId = document.getElementById('profile-user-id');
    
    if (profileImage) profileImage.src = user.profilePicture || 'https://via.placeholder.com/150';
    if (profileFirstName) profileFirstName.value = user.firstName || '';
    if (profileLastName) profileLastName.value = user.lastName || '';
    if (profileEmail) profileEmail.value = user.email || '';
    if (profilePhone) profilePhone.value = user.phone || '';
    if (profileAddress) profileAddress.value = user.address || '';
    if (profileDob) profileDob.value = user.dob || '';
    if (profileGender && user.gender) profileGender.value = user.gender;
    if (profileDisplayName) profileDisplayName.textContent = user.name || 'User Name';
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
    
    // Load recent activities
    loadRecentActivities();
    
    // Load upcoming exams
    loadUpcomingExams();
    
    // Load users for user management
    loadUsers();
    
    // Load exams for exam management
    loadExams();
    
    // Load enrollments
    loadEnrollments();
    
    // Load assessment enrollments
    loadAssessmentEnrollments();
    
    // Load exam schedule
    loadExamSchedule();
    
    // Load keyboard shortcuts
    loadKeyboardShortcuts();
    
    // Load application controls
    loadAppControls();
    
    // Load plagiarism reports and submissions
    loadPlagiarismReports();
    
    // Load resubmission requests
    loadResubmissionRequests();
    
    // Load integrity reports
    loadIntegrityReports();
}

// Mock data for testing
let mockData = {
    users: [],
    exams: [],
    courses: [],
    enrollments: [],
    assessmentEnrollments: [],
    examSchedule: [],
    keyboardShortcuts: [],
    appControls: [],
    plagiarismReports: [],
    resubmissionRequests: [],
    integrityReports: [],
    activities: []
};

// Load mock data
function loadMockData() {
    // Check if mock data is already in localStorage
    const storedMockData = localStorage.getItem('lecturerMockData');
    if (storedMockData) {
        mockData = JSON.parse(storedMockData);
        return;
    }
    
    // Create mock data if not exists
    const courses = [
        { id: '1', name: 'Introduction to Computer Science', instructor: 'Dr. Smith' },
        { id: '2', name: 'Data Structures and Algorithms', instructor: 'Prof. Johnson' },
        { id: '3', name: 'Database Systems', instructor: 'Dr. Williams' }
    ];
    
    const users = [
        { id: '1', name: 'John Doe', email: 'john@example.com', userType: 'student', createdAt: '2023-01-15T08:30:00Z' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', userType: 'student', createdAt: '2023-01-20T10:15:00Z' },
        { id: '3', name: 'Dr. Smith', email: 'smith@example.com', userType: 'lecturer', createdAt: '2022-12-10T09:00:00Z' },
        { id: '4', name: 'Michael Johnson', email: 'michael@example.com', userType: 'student', createdAt: '2023-01-18T09:45:00Z' },
        { id: '5', name: 'Emily Chen', email: 'emily@example.com', userType: 'student', createdAt: '2023-01-25T11:30:00Z' },
        { id: '6', name: 'David Wilson', email: 'david@example.com', userType: 'student', createdAt: '2023-01-22T14:20:00Z' }
    ];
    
    const exams = [
        { id: '1', name: 'Midterm Exam', courseId: '1', date: '2023-06-15', duration: 120, status: 'upcoming' },
        { id: '2', name: 'Final Exam', courseId: '2', date: '2023-07-20', duration: 180, status: 'upcoming' },
        { id: '3', name: 'Quiz 1', courseId: '3', date: '2023-05-10', duration: 60, status: 'completed' },
        { id: '4', name: 'Practice Test', courseId: '1', date: '2023-05-05', duration: 45, status: 'completed' }
    ];}
    
    const enrollments = [
        { id: '1', studentId: '1', courseId: '1', enrolledDate: '2023-01-20T08:30:00Z' },
        { id: '2', studentId: '1', courseId: '2', enrolledDate: '2023-01-21T09:15:00Z' },
        { id: '3', studentId: '2', courseId: '1', enrolledDate: '2023-01-22T10:00:00Z' }
    ];
    
    const assessmentEnrollments = [
        { id: '1', studentId: '1', examId: '1', courseId: '1', enrolledDate: '2023-05-01T08:30:00Z' },
        { id: '2', studentId: '1', examId: '2', courseId: '2', enrolledDate: '2023-06-01T09:15:00Z' },
        { id: '3', studentId: '2', examId: '1', courseId: '1', enrolledDate: '2023-05-02T10:00:00Z' }
    ];
    
    const examSchedule = [
        { id: '1', examId: '1', date: '2023-06-15', startTime: '09:00', endTime: '11:00', location: 'Room A101' },
        { id: '2', examId: '2', date: '2023-07-20', startTime: '14:00', endTime: '17:00', location: 'Room B202' },
        { id: '3', examId: '3', date: '2023-05-10', startTime: '10:00', endTime: '11:00', location: 'Room C303' }
    ];
    
    const keyboardShortcuts = [
        { id: '1', shortcut: 'Ctrl+C', description: 'Copy', status: 'blocked' },
        { id: '2', shortcut: 'Ctrl+V', description: 'Paste', status: 'blocked' },
        { id: '3', shortcut: 'Alt+Tab', description: 'Switch Application', status: 'blocked' }
    ];
    
    const appControls = [
        { id: '1', application: 'Web Browser', status: 'blocked' },
        { id: '2', application: 'File Explorer', status: 'blocked' },
        { id: '3', application: 'Messaging Apps', status: 'blocked' }
    ];
    
    const plagiarismReports = [
        { 
            id: '1', 
            studentId: '1', 
            studentName: 'John Doe',
            examId: '3', 
            examName: 'Quiz 1',
            courseId: '2',
            courseName: 'Data Structures and Algorithms',
            submissionDate: '2023-05-10T11:30:00Z', 
            similarityScore: 15,
            matchedSources: [
                { source: 'Wikipedia - Data Structures', matchPercentage: 8 },
                { source: 'Student ID: 1042 (Jane Smith)', matchPercentage: 7 }
            ],
            flaggedContent: [
                { content: 'A binary search tree is a node-based binary tree data structure which has the following properties...', matchedWith: 'Wikipedia - Data Structures' },
                { content: 'The time complexity of operations on the binary search tree is directly proportional to the height of the tree...', matchedWith: 'Student ID: 1042 (Jane Smith)' }
            ],
            status: 'Flagged for Review'
        },
    ];
    // Integrity Reports - Sample Data
    
    
    const resubmissionRequests = [
        { 
            id: '1', 
            studentId: '3', 
            studentName: 'Michael Johnson',
            examId: '8', 
            examName: 'AI Fundamentals Test',
            submissionId: '3',
            requestDate: '2023-06-06T09:30:00Z', 
            reason: 'Technical issues during submission - my internet connection was unstable', 
            status: 'approved',
            responseDate: '2023-06-07T14:20:00Z',
            responseMessage: 'Request approved. You may resubmit within 48 hours.',
            reviewedBy: 'Prof. Martinez'
        },
        { 
            id: '2', 
            studentId: '1', 
            studentName: 'John Doe',
            examId: '4', 
            examName: 'Practice Test',
            submissionId: '1',
            requestDate: '2023-05-06T10:15:00Z', 
            reason: 'I accidentally submitted before completing all questions', 
            status: 'pending',
            responseDate: null,
            responseMessage: null,
            reviewedBy: null
        },
        { 
            id: '3', 
            studentId: '2', 
            studentName: 'Jane Smith',
            examId: '7', 
            examName: 'Software Design Principles Quiz',
            submissionId: '2',
            requestDate: '2023-05-26T11:45:00Z', 
            reason: 'Power outage during exam submission', 
            status: 'rejected',
            responseDate: '2023-05-27T09:10:00Z',
            responseMessage: 'Request denied. System logs show complete submission was received.',
            reviewedBy: 'Dr. Anderson'
        }
    ];
    
    const integrityReports = [
        
            {
                id: '1',
                studentId: '1',
                examId: '3',
                timestamp: '2023-05-10T10:15:30Z',
                behavior: 'Suspicious Head Movement',
                severity: 'Medium',
                description: 'Student looked away from screen multiple times',
                screenshot: 'https://via.placeholder.com/150?text=Head+Movement',
                videoTimestamp: '00:15:22',
                videoUrl: 'https://example.com/video1',
                status: 'Flagged'
            },
            {
                id: '2',
                studentId: '2',
                examId: '3',
                timestamp: '2023-05-10T10:22:45Z',
                behavior: 'Switch Application Detected',
                severity: 'High',
                description: 'Student switched to browser during exam',
                screenshot: 'https://via.placeholder.com/150?text=App+Switch',
                videoTimestamp: '00:22:45',
                videoUrl: 'https://example.com/video2',
                status: 'Flagged'
            },
            {
                id: '3',
                studentId: '4',
                examId: '3',
                timestamp: '2023-05-10T10:30:12Z',
                behavior: 'Multiple People Detected',
                severity: 'High',
                description: 'Second person appeared in camera view',
                screenshot: 'https://via.placeholder.com/150?text=Multiple+People',
                videoTimestamp: '00:30:12',
                videoUrl: 'https://example.com/video3',
                status: 'Flagged'
            },
            {
                id: '4',
                studentId: '5',
                examId: '3',
                timestamp: '2023-05-10T10:40:05Z',
                behavior: 'Suspicious Audio Detected',
                severity: 'Medium',
                description: 'Voices heard in background during exam',
                screenshot: 'https://via.placeholder.com/150?text=Audio+Detection',
                videoTimestamp: '00:40:05',
                videoUrl: 'https://example.com/video4',
                status: 'Flagged'
            },
            {
                id: '5',
                studentId: '1',
                examId: '4',
                timestamp: '2023-05-05T09:15:30Z',
                behavior: 'Suspicious Head Movement',
                severity: 'Low',
                description: 'Student briefly looked away from screen',
                screenshot: 'https://via.placeholder.com/150?text=Head+Movement',
                videoTimestamp: '00:15:30',
                videoUrl: 'https://example.com/video5',
                status: 'Flagged'
            },
            {
                id: '6',
                studentId: '2',
                examId: '4',
                timestamp: '2023-05-05T09:25:18Z',
                behavior: 'Switch Application Detected',
                severity: 'Medium',
                description: 'Student briefly switched applications',
                screenshot: 'https://via.placeholder.com/150?text=App+Switch',
                videoTimestamp: '00:25:18',
                videoUrl: 'https://example.com/video6',
                status: 'Flagged'
            },
            {
                id: '7',
                studentId: '6',
                examId: '1',
                timestamp: '2023-06-15T09:10:45Z',
                behavior: 'Suspicious Head Movement',
                severity: 'Medium',
                description: 'Student looked down multiple times',
                screenshot: 'https://via.placeholder.com/150?text=Head+Movement',
                videoTimestamp: '00:10:45',
                videoUrl: 'https://example.com/video7',
                status: 'Flagged'
            },
            {
                id: '8',
                studentId: '4',
                examId: '1',
                timestamp: '2023-06-15T09:35:22Z',
                behavior: 'Multiple People Detected',
                severity: 'High',
                description: 'Another person briefly visible in background',
                screenshot: 'https://via.placeholder.com/150?text=Multiple+People',
                videoTimestamp: '00:35:22',
                videoUrl: 'https://example.com/video8',
                status: 'Flagged'
            },
            {
                id: '9',
                studentId: '5',
                examId: '1',
                timestamp: '2023-06-15T10:05:10Z',
                behavior: 'Suspicious Audio Detected',
                severity: 'Medium',
                description: 'Whispering detected during exam',
                screenshot: 'https://via.placeholder.com/150?text=Audio+Detection',
                videoTimestamp: '01:05:10',
                videoUrl: 'https://example.com/video9',
                status: 'Flagged'
            },
            {
                id: '10',
                studentId: '1',
                examId: '2',
                timestamp: '2023-07-20T14:20:33Z',
                behavior: 'Switch Application Detected',
                severity: 'High',
                description: 'Student accessed calculator application',
                screenshot: 'https://via.placeholder.com/150?text=App+Switch',
                videoTimestamp: '00:20:33',
                videoUrl: 'https://example.com/video10',
                status: 'Flagged'
            },
            {
                id: '11',
                studentId: '2',
                examId: '2',
                timestamp: '2023-07-20T14:45:15Z',
                behavior: 'Suspicious Head Movement',
                severity: 'Low',
                description: 'Student looked away briefly',
                screenshot: 'https://via.placeholder.com/150?text=Head+Movement',
                videoTimestamp: '00:45:15',
                videoUrl: 'https://example.com/video11',
                status: 'Flagged'
            },
            {
                id: '12',
                studentId: '6',
                examId: '2',
                timestamp: '2023-07-20T15:10:40Z',
                behavior: 'Multiple People Detected',
                severity: 'High',
                description: 'Second person appeared to assist student',
                screenshot: 'https://via.placeholder.com/150?text=Multiple+People',
                videoTimestamp: '01:10:40',
                videoUrl: 'https://example.com/video12',
                status: 'Flagged'
            },
            { 
                id: '2', 
                studentId: '2', 
                studentName: 'Jane Smith',
                examId: '3', 
                examName: 'Quiz 1',
                courseId: '2',
                courseName: 'Data Structures and Algorithms',
                submissionDate: '2023-05-10T11:45:00Z', 
                similarityScore: 8,
                matchedSources: [
                    { source: 'Course Textbook', matchPercentage: 8 }
                ],
                flaggedContent: [
                    { content: 'The definition of a balanced binary tree is one where the heights of the two subtrees of any node differ by no more than 1.', matchedWith: 'Course Textbook' }
                ],
                status: 'Acceptable'
            },
            { 
                id: '3', 
                studentId: '3', 
                studentName: 'Michael Johnson',
                examId: '8', 
                examName: 'AI Fundamentals Test',
                courseId: '5',
                courseName: 'Artificial Intelligence',
                submissionDate: '2023-06-05T16:30:00Z', 
                similarityScore: 42,
                matchedSources: [
                    { source: 'Online AI Course - Stanford', matchPercentage: 25 },
                    { source: 'Student ID: 1078 (Robert Chen)', matchPercentage: 17 }
                ],
                flaggedContent: [
                    { content: 'Machine learning is a subset of artificial intelligence that provides systems the ability to automatically learn and improve from experience without being explicitly programmed.', matchedWith: 'Online AI Course - Stanford' },
                    { content: 'The three main types of machine learning are supervised learning, unsupervised learning, and reinforcement learning.', matchedWith: 'Student ID: 1078 (Robert Chen)' },
                    { content: 'Neural networks are computing systems inspired by the biological neural networks that constitute animal brains.', matchedWith: 'Online AI Course - Stanford' }
                ],
                status: 'Severe Plagiarism'
            },
            { 
                id: '4', 
                studentId: '1', 
                studentName: 'John Doe',
                examId: '2', 
                examName: 'Final Exam',
                courseId: '1',
                courseName: 'Introduction to Computer Science',
                submissionDate: '2023-07-15T14:20:00Z', 
                similarityScore: 28,
                matchedSources: [
                    { source: 'GitHub Repository - CS101', matchPercentage: 18 },
                    { source: 'Student ID: 1056 (Emily Wilson)', matchPercentage: 10 }
                ],
                flaggedContent: [
                    { content: 'The quicksort algorithm follows a divide-and-conquer approach. It works by selecting a pivot element and partitioning the array around the pivot...', matchedWith: 'GitHub Repository - CS101' },
                    { content: 'The average time complexity of quicksort is O(n log n), making it efficient for large datasets compared to simpler algorithms like bubble sort or insertion sort.', matchedWith: 'Student ID: 1056 (Emily Wilson)' }
                ],
                status: 'Flagged for Review'
            },
            { 
                id: '5', 
                studentId: '2', 
                studentName: 'Jane Smith',
                examId: '1', 
                examName: 'Midterm Exam',
                courseId: '1',
                courseName: 'Introduction to Computer Science',
                submissionDate: '2023-06-12T10:15:00Z', 
                similarityScore: 5,
                matchedSources: [
                    { source: 'Course Lecture Notes', matchPercentage: 5 }
                ],
                flaggedContent: [
                    { content: 'Object-oriented programming is a programming paradigm based on the concept of objects, which can contain data and code.', matchedWith: 'Course Lecture Notes' }
                ],
                status: 'Acceptable'
            },
            { 
                id: '6', 
                studentId: '3', 
                studentName: 'Michael Johnson',
                examId: '4', 
                examName: 'Practice Test',
                courseId: '3',
                courseName: 'Database Systems',
                submissionDate: '2023-05-02T09:45:00Z', 
                similarityScore: 65,
                matchedSources: [
                    { source: 'Chegg.com - Database Solutions', matchPercentage: 40 },
                    { source: 'Student ID: 1089 (Thomas Brown)', matchPercentage: 25 }
                ],
                flaggedContent: [
                    { content: 'SQL normalization is the process of structuring a relational database in accordance with a series of normal forms in order to reduce data redundancy and improve data integrity.', matchedWith: 'Chegg.com - Database Solutions' },
                    { content: 'The first normal form (1NF) requires that all attributes in a relation be atomic, the second normal form (2NF) requires that all non-key attributes be fully functionally dependent on the primary key...', matchedWith: 'Chegg.com - Database Solutions' },
                    { content: 'The ACID properties (Atomicity, Consistency, Isolation, Durability) are a set of properties that guarantee database transactions are processed reliably.', matchedWith: 'Student ID: 1089 (Thomas Brown)' }
                ],
                status: 'Severe Plagiarism'
            },
            { 
                id: '7', 
                studentId: '1', 
                studentName: 'John Doe',
                examId: '7', 
                examName: 'Software Design Principles Quiz',
                courseId: '4',
                courseName: 'Software Engineering',
                submissionDate: '2023-05-22T13:30:00Z', 
                similarityScore: 18,
                matchedSources: [
                    { source: 'Medium.com - Software Design Article', matchPercentage: 12 },
                    { source: 'Stack Overflow - Design Patterns', matchPercentage: 6 }
                ],
                flaggedContent: [
                    { content: 'The SOLID principles are a set of five design principles intended to make software designs more understandable, flexible, and maintainable.', matchedWith: 'Medium.com - Software Design Article' },
                    { content: 'The Single Responsibility Principle states that a class should have only one reason to change, meaning it should have only one job or responsibility.', matchedWith: 'Stack Overflow - Design Patterns' }
                ],
                status: 'Flagged for Review'
            },
            { 
                id: '8', 
                studentId: '2', 
                studentName: 'Jane Smith',
                examId: '6', 
                examName: 'Database Final Exam',
                courseId: '3',
                courseName: 'Database Systems',
                submissionDate: '2023-07-20T15:45:00Z', 
                similarityScore: 32,
                matchedSources: [
                    { source: 'W3Schools - SQL Tutorial', matchPercentage: 20 },
                    { source: 'Student ID: 1067 (Sarah Johnson)', matchPercentage: 12 }
                ],
                flaggedContent: [
                    { content: 'A JOIN clause is used to combine rows from two or more tables, based on a related column between them. The different types of JOINs in SQL are INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL JOIN.', matchedWith: 'W3Schools - SQL Tutorial' },
                    { content: 'An index in a database is a data structure that improves the speed of data retrieval operations on a database table at the cost of additional storage space and slower writes.', matchedWith: 'Student ID: 1067 (Sarah Johnson)' }
                ],
                status: 'Flagged for Review'
            }
        
    ];
    
    const activities = [
        { id: '1', description: 'Created new exam: Midterm Exam', timestamp: '2023-05-01T09:30:00Z' },
        { id: '2', description: 'Updated exam schedule for Final Exam', timestamp: '2023-05-02T14:15:00Z' },
        { id: '3', description: 'Enrolled 5 students in Database Systems course', timestamp: '2023-05-03T11:00:00Z' },
        { id: '4', description: 'Approved resubmission request from Jane Smith', timestamp: '2023-05-11T13:45:00Z' },
        { id: '5', description: 'Generated integrity report for Quiz 1', timestamp: '2023-05-12T10:30:00Z' }
    ];
    
    // Create mock submissions data
    const submissions = [
        {
            id: '1',
            studentId: '1',
            studentName: 'John Doe',
            examId: '3',
            submissionDate: '2023-05-10T11:30:00Z',
            content: 'This is a sample submission for Quiz 1'
        },
        {
            id: '2',
            studentId: '2',
            studentName: 'Jane Smith',
            examId: '3',
            submissionDate: '2023-05-10T11:45:00Z',
            content: 'Another sample submission for Quiz 1'
        },
        {
            id: '3',
            studentId: '3',
            studentName: 'Michael Johnson',
            examId: '8',
            submissionDate: '2023-06-05T16:30:00Z',
            content: 'Submission for AI Fundamentals Test'
        },
        {
            id: '4',
            studentId: '1',
            studentName: 'John Doe',
            examId: '2',
            submissionDate: '2023-07-15T14:20:00Z',
            content: 'Submission for Final Exam'
        },
        {
            id: '5',
            studentId: '2',
            studentName: 'Jane Smith',
            examId: '1',
            submissionDate: '2023-06-12T10:15:00Z',
            content: 'Submission for Midterm Exam'
        },
        {
            id: '6',
            studentId: '3',
            studentName: 'Michael Johnson',
            examId: '4',
            submissionDate: '2023-05-02T09:45:00Z',
            content: 'Submission for Practice Test'
        }
    ];
    
    // Assign mock data
    mockData.courses = courses;
    mockData.users = users;
    mockData.exams = exams;
    mockData.enrollments = enrollments;
    mockData.assessmentEnrollments = assessmentEnrollments;
    mockData.examSchedule = examSchedule;
    mockData.keyboardShortcuts = keyboardShortcuts;
    mockData.appControls = appControls;
    mockData.plagiarismReports = plagiarismReports;
    mockData.resubmissionRequests = resubmissionRequests;
    mockData.integrityReports = integrityReports;
    mockData.activities = activities;
    mockData.submissions = submissions;
    
    // Save to localStorage
    localStorage.setItem('lecturerMockData', JSON.stringify(mockData));


// Update dashboard stats
function updateDashboardStats() {
    const studentsCount = mockData.users.filter(user => user.userType === 'student').length;
    const examsCount = mockData.exams.length;
    const coursesCount = mockData.courses.length;
    const submissionsCount = mockData.plagiarismReports.length;
    
    document.getElementById('students-count').textContent = studentsCount;
    document.getElementById('exams-count').textContent = examsCount;
    document.getElementById('courses-count').textContent = coursesCount;
    document.getElementById('submissions-count').textContent = submissionsCount;
}

// Load recent activities
function loadRecentActivities() {
    const activitiesList = document.getElementById('recent-activities');
    if (!activitiesList) return;
    
    activitiesList.innerHTML = '';
    
    // Sort activities by timestamp (newest first)
    const sortedActivities = [...mockData.activities].sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
    });
    
    // Display activities
    sortedActivities.forEach(activity => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="activity-info">
                <p>${activity.description}</p>
                <span>${formatDate(activity.timestamp)}</span>
            </div>
        `;
        activitiesList.appendChild(li);
    });
}

// Load upcoming exams
function loadUpcomingExams() {
    const examsTable = document.getElementById('upcoming-exams-table');
    if (!examsTable) return;
    
    const tbody = examsTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    // Filter upcoming exams and sort by date
    const upcomingExams = mockData.exams
        .filter(exam => exam.status === 'upcoming')
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Display exams
    upcomingExams.forEach(exam => {
        const course = mockData.courses.find(c => c.id === exam.courseId);
        const enrolledStudents = mockData.assessmentEnrollments.filter(e => e.examId === exam.id).length;
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${exam.name}</td>
            <td>${course ? course.name : 'Unknown Course'}</td>
            <td>${formatDateShort(exam.date)}</td>
            <td>${getExamTimeFromSchedule(exam.id)}</td>
            <td>${enrolledStudents}</td>
            <td>
                <button class="action-btn" onclick="viewExamDetails('${exam.id}')">View</button>
                <button class="action-btn" onclick="editExam('${exam.id}')">Edit</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Get exam time from schedule
function getExamTimeFromSchedule(examId) {
    const schedule = mockData.examSchedule.find(s => s.examId === examId);
    return schedule ? `${schedule.startTime} - ${schedule.endTime}` : 'Not scheduled';
}

// Load users for user management
function loadUsers() {
    const usersTable = document.getElementById('users-table');
    if (!usersTable) return;
    
    const tbody = usersTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    // Sort users by creation date (newest first)
    const sortedUsers = [...mockData.users].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });
    
    // Display users
    sortedUsers.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${capitalizeFirstLetter(user.userType)}</td>
            <td>${formatDateShort(user.createdAt)}</td>
            <td>
                <button class="action-btn" onclick="viewUserDetails('${user.id}')">View</button>
                <button class="action-btn" onclick="editUser('${user.id}')">Edit</button>
                <button class="action-btn delete" onclick="deleteUser('${user.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Filter users based on search and type filter
function filterUsers() {
    const searchTerm = document.getElementById('user-search').value.toLowerCase();
    const typeFilter = document.getElementById('user-type-filter').value;
    
    const usersTable = document.getElementById('users-table');
    if (!usersTable) return;
    
    const tbody = usersTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    // Filter and sort users
    const filteredUsers = mockData.users
        .filter(user => {
            // Apply type filter
            if (typeFilter !== 'all' && user.userType !== typeFilter) {
                return false;
            }
            
            // Apply search filter
            return user.name.toLowerCase().includes(searchTerm) || 
                   user.email.toLowerCase().includes(searchTerm);
        })
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // Display filtered users
    filteredUsers.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${capitalizeFirstLetter(user.userType)}</td>
            <td>${formatDateShort(user.createdAt)}</td>
            <td>
                <button class="action-btn" onclick="viewUserDetails('${user.id}')">View</button>
                <button class="action-btn" onclick="editUser('${user.id}')">Edit</button>
                <button class="action-btn delete" onclick="deleteUser('${user.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// View user details
function viewUserDetails(userId) {
    const user = mockData.users.find(u => u.id === userId);
    if (!user) {
        alert('User not found');
        return;
    }
    
    // In a real app, this would open a modal with user details
    alert(`User Details:\nName: ${user.name}\nEmail: ${user.email}\nType: ${capitalizeFirstLetter(user.userType)}\nCreated: ${formatDate(user.createdAt)}`);
}

// Edit user
function editUser(userId) {
    const user = mockData.users.find(u => u.id === userId);
    if (!user) {
        alert('User not found');
        return;
    }
    
    // In a real app, this would open a modal with a form to edit user details
    const newName = prompt('Enter new name:', user.name);
    if (newName === null) return;
    
    const newEmail = prompt('Enter new email:', user.email);
    if (newEmail === null) return;
    
    // Update user
    user.name = newName.trim();
    user.email = newEmail.trim();
    
    // Save to localStorage
    localStorage.setItem('lecturerMockData', JSON.stringify(mockData));
    
    // Reload users
    loadUsers();
    
    // Add activity
    addActivity(`Updated user: ${user.name}`);
}

// Delete user
function deleteUser(userId) {
    if (!confirm('Are you sure you want to delete this user?')) {
        return;
    }
    
    const userIndex = mockData.users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
        alert('User not found');
        return;
    }
    
    const user = mockData.users[userIndex];
    
    // Remove user
    mockData.users.splice(userIndex, 1);
    
    // Remove related enrollments
    mockData.enrollments = mockData.enrollments.filter(e => e.studentId !== userId);
    mockData.assessmentEnrollments = mockData.assessmentEnrollments.filter(e => e.studentId !== userId);
    
    // Save to localStorage
    localStorage.setItem('lecturerMockData', JSON.stringify(mockData));
    
    // Reload users
    loadUsers();
    
    // Update dashboard stats
    updateDashboardStats();
    
    // Add activity
    addActivity(`Deleted user: ${user.name}`);
}

// Add user
function addUser() {
    const name = document.getElementById('user-name').value.trim();
    const email = document.getElementById('user-email').value.trim();
    const userType = document.getElementById('user-type').value;
    const password = document.getElementById('user-password').value;
    
    // Validation
    if (!name || !email || !password) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Check if email already exists
    if (mockData.users.some(u => u.email === email)) {
        alert('Email already exists');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        userType,
        password, // In a real app, this would be hashed
        profilePicture: 'https://via.placeholder.com/150',
        createdAt: new Date().toISOString()
    };
    
    // Add to users array
    mockData.users.push(newUser);
    
    // Save to localStorage
    localStorage.setItem('lecturerMockData', JSON.stringify(mockData));
    
    // Close modal
    closeModal('add-user-modal');
    
    // Reload users
    loadUsers();
    
    // Update dashboard stats
    updateDashboardStats();
    
    // Add activity
    addActivity(`Added new user: ${newUser.name}`);
}

// Load exams for exam management
function loadExams() {
    const examsTable = document.getElementById('exams-table');
    if (!examsTable) return;
    
    const tbody = examsTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    // Sort exams by date (newest first)
    const sortedExams = [...mockData.exams].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });
    
    // Display exams
    sortedExams.forEach(exam => {
        const course = mockData.courses.find(c => c.id === exam.courseId);
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${exam.name}</td>
            <td>${course ? course.name : 'Unknown Course'}</td>
            <td>${formatDateShort(exam.date)}</td>
            <td>${exam.duration} min</td>
            <td><span class="status-badge ${exam.status}">${capitalizeFirstLetter(exam.status)}</span></td>
            <td>
                <button class="action-btn" onclick="viewExamDetails('${exam.id}')">View</button>
                <button class="action-btn" onclick="editExam('${exam.id}')">Edit</button>
                <button class="action-btn delete" onclick="deleteExam('${exam.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Filter exams based on search and status filter
function filterExams() {
    const searchTerm = document.getElementById('exam-search').value.toLowerCase();
    const statusFilter = document.getElementById('exam-status-filter').value;
    
    const examsTable = document.getElementById('exams-table');
    if (!examsTable) return;
    
    const tbody = examsTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    // Filter and sort exams
    const filteredExams = mockData.exams
        .filter(exam => {
            // Apply status filter
            if (statusFilter !== 'all' && exam.status !== statusFilter) {
                return false;
            }
            
            // Apply search filter
            return exam.name.toLowerCase().includes(searchTerm);
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Display filtered exams
    filteredExams.forEach(exam => {
        const course = mockData.courses.find(c => c.id === exam.courseId);
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${exam.name}</td>
            <td>${course ? course.name : 'Unknown Course'}</td>
            <td>${formatDateShort(exam.date)}</td>
            <td>${exam.duration} min</td>
            <td><span class="status-badge ${exam.status}">${capitalizeFirstLetter(exam.status)}</span></td>
            <td>
                <button class="action-btn" onclick="viewExamDetails('${exam.id}')">View</button>
                <button class="action-btn" onclick="editExam('${exam.id}')">Edit</button>
                <button class="action-btn delete" onclick="deleteExam('${exam.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// View exam details
function viewExamDetails(examId) {
    const exam = mockData.exams.find(e => e.id === examId);
    if (!exam) {
        alert('Exam not found');
        return;
    }
    
    const course = mockData.courses.find(c => c.id === exam.courseId);
    const schedule = mockData.examSchedule.find(s => s.examId === examId);
    
    // In a real app, this would open a modal with exam details
    alert(`Exam Details:\nName: ${exam.name}\nCourse: ${course ? course.name : 'Unknown Course'}\nDate: ${formatDateShort(exam.date)}\nDuration: ${exam.duration} min\nStatus: ${capitalizeFirstLetter(exam.status)}\nSchedule: ${schedule ? `${formatDateShort(schedule.date)} ${schedule.startTime} - ${schedule.endTime}` : 'Not scheduled'}`);
}

// Edit exam
function editExam(examId) {
    const exam = mockData.exams.find(e => e.id === examId);
    if (!exam) {
        alert('Exam not found');
        return;
    }
    
    // In a real app, this would open a modal with a form to edit exam details
    const newName = prompt('Enter new exam name:', exam.name);
    if (newName === null) return;
    
    const newDate = prompt('Enter new date (YYYY-MM-DD):', exam.date);
    if (newDate === null) return;
    
    const newDuration = prompt('Enter new duration (minutes):', exam.duration);
    if (newDuration === null) return;
    
    // Update exam
    exam.name = newName.trim();
    exam.date = newDate.trim();
    exam.duration = parseInt(newDuration.trim());
    
    // Save to localStorage
    localStorage.setItem('lecturerMockData', JSON.stringify(mockData));
    
    // Reload exams
    loadExams();
    loadUpcomingExams();
    
    // Add activity
    addActivity(`Updated exam: ${exam.name}`);
}

// Delete exam
function deleteExam(examId) {
    if (!confirm('Are you sure you want to delete this exam?')) {
        return;
    }
    
    const examIndex = mockData.exams.findIndex(e => e.id === examId);
    if (examIndex === -1) {
        alert('Exam not found');
        return;
    }
    
    const exam = mockData.exams[examIndex];
    
    // Remove exam
    mockData.exams.splice(examIndex, 1);
    
    // Remove related schedules and enrollments
    mockData.examSchedule = mockData.examSchedule.filter(s => s.examId !== examId);
    mockData.assessmentEnrollments = mockData.assessmentEnrollments.filter(e => e.examId !== examId);
    
    // Save to localStorage
    localStorage.setItem('lecturerMockData', JSON.stringify(mockData));
    
    // Reload exams
    loadExams();
    loadUpcomingExams();
    
    // Update dashboard stats
    updateDashboardStats();
    
    // Add activity
    addActivity(`Deleted exam: ${exam.name}`);
}

// Add exam
function addExam() {
    const name = document.getElementById('exam-name').value.trim();
    const courseId = document.getElementById('exam-course').value;
    const date = document.getElementById('exam-date').value;
    const startTime = document.getElementById('exam-start-time').value;
    const duration = document.getElementById('exam-duration').value;
    const location = document.getElementById('exam-location').value.trim();
    
    // Validation
    if (!name || !courseId || !date || !startTime || !duration || !location) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Create new exam
    const newExam = {
        id: Date.now().toString(),
        name,
        courseId,
        date,
        duration: parseInt(duration),
        status: 'upcoming'
    };
    
    // Add to exams array
    mockData.exams.push(newExam);
    
    // Calculate end time
    const startTimeParts = startTime.split(':');
    const startHour = parseInt(startTimeParts[0]);
    const startMinute = parseInt(startTimeParts[1]);
    
    const endTimeDate = new Date();
    endTimeDate.setHours(startHour);
    endTimeDate.setMinutes(startMinute + parseInt(duration));
    
    const endTime = `${endTimeDate.getHours().toString().padStart(2, '0')}:${endTimeDate.getMinutes().toString().padStart(2, '0')}`;
    
    // Create new schedule
    const newSchedule = {
        id: Date.now().toString() + '-schedule',
        examId: newExam.id,
        date,
        startTime,
        endTime,
        location
    };
    
    // Add to schedule array
    mockData.examSchedule.push(newSchedule);
    
    // Save to localStorage
    localStorage.setItem('lecturerMockData', JSON.stringify(mockData));
    
    // Close modal
    closeModal('add-exam-modal');
    
    // Reload exams
    loadExams();
    loadUpcomingExams();
    loadExamSchedule();
    
    // Update dashboard stats
    updateDashboardStats();
    
    // Add activity
    addActivity(`Created new exam: ${newExam.name}`);
}

// Load enrollments
function loadEnrollments() {
    const enrollmentsTable = document.getElementById('enrollments-table');
    if (!enrollmentsTable) return;
    
    const tbody = enrollmentsTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    // Populate course filter
    const courseFilter = document.getElementById('course-filter');
    if (courseFilter) {
        courseFilter.innerHTML = '<option value="all">All Courses</option>';
        mockData.courses.forEach(course => {
            courseFilter.innerHTML += `<option value="${course.id}">${course.name}</option>`;
        });
    }
    
    // Sort enrollments by date (newest first)
    const sortedEnrollments = [...mockData.enrollments].sort((a, b) => {
        return new Date(b.enrolledDate) - new Date(a.enrolledDate);
    });
    
    // Display enrollments
    sortedEnrollments.forEach(enrollment => {
        const student = mockData.users.find(u => u.id === enrollment.studentId);
        const course = mockData.courses.find(c => c.id === enrollment.courseId);
        
        if (student && course) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${course.name}</td>
                <td>${formatDateShort(enrollment.enrolledDate)}</td>
                <td>
                    <button class="action-btn delete" onclick="removeEnrollment('${enrollment.id}')">Remove</button>
                </td>
            `;
            tbody.appendChild(tr);
        }
    });
}

// Filter enrollments based on course filter
function filterEnrollments() {
    const courseFilter = document.getElementById('course-filter').value;
    
    const enrollmentsTable = document.getElementById('enrollments-table');
    if (!enrollmentsTable) return;
    
    const tbody = enrollmentsTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    // Filter and sort enrollments
    const filteredEnrollments = mockData.enrollments
        .filter(enrollment => {
            // Apply course filter
            if (courseFilter !== 'all' && enrollment.courseId !== courseFilter) {
                return false;
            }
            
            return true;
        })
        .sort((a, b) => new Date(b.enrolledDate) - new Date(a.enrolledDate));
    
    // Display filtered enrollments
    filteredEnrollments.forEach(enrollment => {
        const student = mockData.users.find(u => u.id === enrollment.studentId);
        const course = mockData.courses.find(c => c.id === enrollment.courseId);
        
        if (student && course) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${course.name}</td>
                <td>${formatDateShort(enrollment.enrolledDate)}</td>
                <td>
                    <button class="action-btn delete" onclick="removeEnrollment('${enrollment.id}')">Remove</button>
                </td>
            `;
            tbody.appendChild(tr);
        }
    });
}

// Add enrollment
function addEnrollment() {
    const studentId = document.getElementById('enrollment-student').value;
    const courseId = document.getElementById('enrollment-course').value;
    
    // Validation
    if (!studentId || !courseId) {
        alert('Please select a student and a course');
        return;
    }
    
    // Check if enrollment already exists
    if (mockData.enrollments.some(e => e.studentId === studentId && e.courseId === courseId)) {
        alert('Student is already enrolled in this course');
        return;
    }
    
    // Create new enrollment
    const newEnrollment = {
        id: Date.now().toString(),
        studentId,
        courseId,
        enrolledDate: new Date().toISOString()
    };
    
    // Add to enrollments array
    mockData.enrollments.push(newEnrollment);
    
    // Save to localStorage
    localStorage.setItem('lecturerMockData', JSON.stringify(mockData));
    
    // Close modal
    closeModal('add-enrollment-modal');
    
    // Reload enrollments
    loadEnrollments();
    
    // Add activity
    const student = mockData.users.find(u => u.id === studentId);
    const course = mockData.courses.find(c => c.id === courseId);
    addActivity(`Enrolled ${student ? student.name : 'student'} in ${course ? course.name : 'course'}`);
}

// Remove enrollment
function removeEnrollment(enrollmentId) {
    if (!confirm('Are you sure you want to remove this enrollment?')) {
        return;
    }
    
    const enrollmentIndex = mockData.enrollments.findIndex(e => e.id === enrollmentId);
    if (enrollmentIndex === -1) {
        alert('Enrollment not found');
        return;
    }
    
    const enrollment = mockData.enrollments[enrollmentIndex];
    const student = mockData.users.find(u => u.id === enrollment.studentId);
    const course = mockData.courses.find(c => c.id === enrollment.courseId);
    
    // Remove enrollment
    mockData.enrollments.splice(enrollmentIndex, 1);
    
    // Remove related assessment enrollments
    mockData.assessmentEnrollments = mockData.assessmentEnrollments.filter(e => 
        !(e.studentId === enrollment.studentId && e.courseId === enrollment.courseId)
    );
    
    // Save to localStorage
    localStorage.setItem('lecturerMockData', JSON.stringify(mockData));
    
    // Reload enrollments
    loadEnrollments();
    
    // Add activity
    addActivity(`Removed ${student ? student.name : 'student'} from ${course ? course.name : 'course'}`);
}

// Load assessment enrollments
function loadAssessmentEnrollments() {
    const assessmentEnrollmentsTable = document.getElementById('assessment-enrollments-table');
    if (!assessmentEnrollmentsTable) return;
    
    const tbody = assessmentEnrollmentsTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    // Populate assessment filter
    const assessmentFilter = document.getElementById('assessment-filter');
    if (assessmentFilter) {
        assessmentFilter.innerHTML = '<option value="all">All Assessments</option>';
        mockData.exams.forEach(exam => {
            assessmentFilter.innerHTML += `<option value="${exam.id}">${exam.name}</option>`;
        });
    }
    
    // Sort assessment enrollments by date (newest first)
    const sortedAssessmentEnrollments = [...mockData.assessmentEnrollments].sort((a, b) => {
        return new Date(b.enrolledDate) - new Date(a.enrolledDate);
    });
    
    // Display assessment enrollments
    sortedAssessmentEnrollments.forEach(enrollment => {
        const student = mockData.users.find(u => u.id === enrollment.studentId);
        const exam = mockData.exams.find(e => e.id === enrollment.examId);
        const course = mockData.courses.find(c => c.id === enrollment.courseId);
        
        if (student && exam && course) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${exam.name}</td>
                <td>${course.name}</td>
                <td>${formatDateShort(enrollment.enrolledDate)}</td>
                <td>
                    <button class="action-btn delete" onclick="removeAssessmentEnrollment('${enrollment.id}')">Remove</button>
                </td>
            `;
            tbody.appendChild(tr);
        }
    });
}

// Filter assessment enrollments based on assessment filter
function filterAssessmentEnrollments() {
    const assessmentFilter = document.getElementById('assessment-filter').value;
    
    const assessmentEnrollmentsTable = document.getElementById('assessment-enrollments-table');
    if (!assessmentEnrollmentsTable) return;
    
    const tbody = assessmentEnrollmentsTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    // Filter and sort assessment enrollments
    const filteredAssessmentEnrollments = mockData.assessmentEnrollments
        .filter(enrollment => {
            // Apply assessment filter
            if (assessmentFilter !== 'all' && enrollment.examId !== assessmentFilter) {
                return false;
            }
            
            return true;
        })
        .sort((a, b) => new Date(b.enrolledDate) - new Date(a.enrolledDate));
    
    // Display filtered assessment enrollments
    filteredAssessmentEnrollments.forEach(enrollment => {
        const student = mockData.users.find(u => u.id === enrollment.studentId);
        const exam = mockData.exams.find(e => e.id === enrollment.examId);
        const course = mockData.courses.find(c => c.id === enrollment.courseId);
        
        if (student && exam && course) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${exam.name}</td>
                <td>${course.name}</td>
                <td>${formatDateShort(enrollment.enrolledDate)}</td>
                <td>
                    <button class="action-btn delete" onclick="removeAssessmentEnrollment('${enrollment.id}')">Remove</button>
                </td>
            `;
            tbody.appendChild(tr);
        }
    });
}

// Generate enrollment report
function generateEnrollmentReport() {
    // In a real app, this would generate a PDF or Excel report
    alert('Enrollment report generated successfully!');
    
    // Add activity
    addActivity('Generated assessment enrollment report');
}

// Print enrollment report
function printEnrollmentReport() {
    // In a real app, this would print the report
    window.print();
    
    // Add activity
    addActivity('Printed assessment enrollment report');
}

// Load exam schedule
function loadExamSchedule() {
    const scheduleTable = document.getElementById('schedule-table');
    if (!scheduleTable) return;
    
    const tbody = scheduleTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    // Sort schedule by date and time
    const sortedSchedule = [...mockData.examSchedule].sort((a, b) => {
        const dateA = new Date(a.date + 'T' + a.startTime);
        const dateB = new Date(b.date + 'T' + b.startTime);
        return dateA - dateB;
    });
    
    // Display schedule
    sortedSchedule.forEach(schedule => {
        const exam = mockData.exams.find(e => e.id === schedule.examId);
        const course = exam ? mockData.courses.find(c => c.id === exam.courseId) : null;
        
        if (exam && course) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${exam.name}</td>
                <td>${course.name}</td>
                <td>${formatDateShort(schedule.date)}</td>
                <td>${schedule.startTime}</td>
                <td>${schedule.endTime}</td>
                <td>${schedule.location}</td>
                <td>
                    <button class="action-btn" onclick="editSchedule('${schedule.id}')">Edit</button>
                    <button class="action-btn delete" onclick="deleteSchedule('${schedule.id}')">Delete</button>
                </td>
            `;
            tbody.appendChild(tr);
        }
    });
    
    // Initialize calendar (in a real app, this would use a calendar library)
    const calendar = document.getElementById('calendar');
    if (calendar) {
        calendar.innerHTML = '<div class="calendar-placeholder">Calendar view would be implemented here</div>';
    }
}

// Add schedule
function addSchedule() {
    const examId = document.getElementById('schedule-exam').value;
    const date = document.getElementById('schedule-date').value;
    const startTime = document.getElementById('schedule-start-time').value;
    const endTime = document.getElementById('schedule-end-time').value;
    const location = document.getElementById('schedule-location').value.trim();
    
    // Validation
    if (!examId || !date || !startTime || !endTime || !location) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Check if schedule already exists
    if (mockData.examSchedule.some(s => s.examId === examId)) {
        if (!confirm('This exam already has a schedule. Do you want to update it?')) {
            return;
        }
        
        // Update existing schedule
        const existingSchedule = mockData.examSchedule.find(s => s.examId === examId);
        existingSchedule.date = date;
        existingSchedule.startTime = startTime;
        existingSchedule.endTime = endTime;
        existingSchedule.location = location;
    } else {
        // Create new schedule
        const newSchedule = {
            id: Date.now().toString(),
            examId,
            date,
            startTime,
            endTime,
            location
        };
        
        // Add to schedule array
        mockData.examSchedule.push(newSchedule);
    }
    
    // Save to localStorage
    localStorage.setItem('lecturerMockData', JSON.stringify(mockData));
    
    // Close modal
    closeModal('add-schedule-modal');
    
    // Reload schedule
    loadExamSchedule();
    loadUpcomingExams();
    
    // Add activity
    const exam = mockData.exams.find(e => e.id === examId);
    addActivity(`Updated exam schedule for ${exam ? exam.name : 'exam'}`);
}

// Edit schedule
function editSchedule(scheduleId) {
    const schedule = mockData.examSchedule.find(s => s.id === scheduleId);
    if (!schedule) {
        alert('Schedule not found');
        return;
    }
    
    // In a real app, this would open a modal with a form to edit schedule details
    const newDate = prompt('Enter new date (YYYY-MM-DD):', schedule.date);
    if (newDate === null) return;
    
    const newStartTime = prompt('Enter new start time (HH:MM):', schedule.startTime);
    if (newStartTime === null) return;
    
    const newEndTime = prompt('Enter new end time (HH:MM):', schedule.endTime);
    if (newEndTime === null) return;
    
    const newLocation = prompt('Enter new location:', schedule.location);
    if (newLocation === null) return;
    
    // Update schedule
    schedule.date = newDate.trim();
    schedule.startTime = newStartTime.trim();
    schedule.endTime = newEndTime.trim();
    schedule.location = newLocation.trim();
    
    // Save to localStorage
    localStorage.setItem('lecturerMockData', JSON.stringify(mockData));
    
    // Reload schedule
    loadExamSchedule();
    loadUpcomingExams();
    
    // Add activity
    const exam = mockData.exams.find(e => e.id === schedule.examId);
    addActivity(`Updated exam schedule for ${exam ? exam.name : 'exam'}`);
}

// Delete schedule
function deleteSchedule(scheduleId) {
    if (!confirm('Are you sure you want to delete this schedule?')) {
        return;
    }
    
    const scheduleIndex = mockData.examSchedule.findIndex(s => s.id === scheduleId);
    if (scheduleIndex === -1) {
        alert('Schedule not found');
        return;
    }
    
    const schedule = mockData.examSchedule[scheduleIndex];
    const exam = mockData.exams.find(e => e.id === schedule.examId);
    
    // Remove schedule
    mockData.examSchedule.splice(scheduleIndex, 1);
    
    // Save to localStorage
    localStorage.setItem('lecturerMockData', JSON.stringify(mockData));
    
    // Reload schedule
    loadExamSchedule();
    loadUpcomingExams();
    
    // Add activity
    addActivity(`Deleted exam schedule for ${exam ? exam.name : 'exam'}`);
}

// Load keyboard shortcuts
function loadKeyboardShortcuts() {
    const shortcutsTable = document.getElementById('shortcuts-table');
    if (!shortcutsTable) return;
    
    const tbody = shortcutsTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    // Display shortcuts
    mockData.keyboardShortcuts.forEach(shortcut => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${shortcut.shortcut}</td>
            <td>${shortcut.description}</td>
            <td><span class="status-badge ${shortcut.status}">${capitalizeFirstLetter(shortcut.status)}</span></td>
            <td>
                <button class="action-btn" onclick="toggleShortcutStatus('${shortcut.id}')">Toggle Status</button>
                <button class="action-btn delete" onclick="deleteShortcut('${shortcut.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Toggle shortcut status
function toggleShortcutStatus(shortcutId) {
    const shortcut = mockData.keyboardShortcuts.find(s => s.id === shortcutId);
    if (!shortcut) {
        alert('Shortcut not found');
        return;
    }
    
    // Toggle status
    shortcut.status = shortcut.status === 'blocked' ? 'allowed' : 'blocked';
    
    // Save to localStorage
    localStorage.setItem('lecturerMockData', JSON.stringify(mockData));
    
    // Reload shortcuts
    loadKeyboardShortcuts();
    
    // Add activity
    addActivity(`${shortcut.status === 'blocked' ? 'Blocked' : 'Allowed'} keyboard shortcut: ${shortcut.shortcut}`);
}

// Add shortcut
function addShortcut() {
    const shortcutKey = document.getElementById('shortcut-key').value.trim();
    const description = document.getElementById('shortcut-description').value.trim();
    
    // Validation
    if (!shortcutKey || !description) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Check if shortcut already exists
    if (mockData.keyboardShortcuts.some(s => s.shortcut === shortcutKey)) {
        alert('This shortcut is already in the list');
        return;
    }
    
    // Create new shortcut
    const newShortcut = {
        id: Date.now().toString(),
        shortcut: shortcutKey,
        description,
        status: 'blocked'
    };
    
    // Add to shortcuts array
    mockData.keyboardShortcuts.push(newShortcut);
    
    // Save to localStorage
    localStorage.setItem('lecturerMockData', JSON.stringify(mockData));
    
    // Close modal
    closeModal('add-shortcut-modal');
    
    // Reload shortcuts
    loadKeyboardShortcuts();
    
    // Add activity
    addActivity(`Added new keyboard shortcut: ${newShortcut.shortcut}`);
}

// Delete shortcut
function deleteShortcut(shortcutId) {
    if (!confirm('Are you sure you want to delete this shortcut?')) {
        return;
    }
    
    const shortcutIndex = mockData.keyboardShortcuts.findIndex(s => s.id === shortcutId);
    if (shortcutIndex === -1) {
        alert('Shortcut not found');
        return;
    }
    
    const shortcut = mockData.keyboardShortcuts[shortcutIndex];
    
    // Remove shortcut
    mockData.keyboardShortcuts.splice(shortcutIndex, 1);
    
    // Save to localStorage
    localStorage.setItem('lecturerMockData', JSON.stringify(mockData));
    
    // Reload shortcuts
    loadKeyboardShortcuts();
    
    // Add activity
    addActivity(`Deleted keyboard shortcut: ${shortcut.shortcut}`);
}

// Load application controls
function loadAppControls() {
    const appControlTable = document.getElementById('app-control-table');
    if (!appControlTable) return;
    
    const tbody = appControlTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    // Display app controls
    mockData.appControls.forEach(appControl => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${appControl.application}</td>
            <td><span class="status-badge ${appControl.status}">${capitalizeFirstLetter(appControl.status)}</span></td>
            <td>
                <button class="action-btn" onclick="toggleAppControlStatus('${appControl.id}')">Toggle Status</button>
                <button class="action-btn delete" onclick="deleteAppControl('${appControl.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Toggle app control status
function toggleAppControlStatus(appControlId) {
    const appControl = mockData.appControls.find(a => a.id === appControlId);
    if (!appControl) {
        alert('Application control not found');
        return;
    }
    
    // Toggle status
    appControl.status = appControl.status === 'blocked' ? 'allowed' : 'blocked';
    
    // Save to localStorage
    localStorage.setItem('lecturerMockData', JSON.stringify(mockData));
    
    // Reload app controls
    loadAppControls();
    
    // Add activity
    addActivity(`${appControl.status === 'blocked' ? 'Blocked' : 'Allowed'} application: ${appControl.application}`);
}

// Add app control
function addAppControl() {
    const application = document.getElementById('app-name').value.trim();
    
    // Validation
    if (!application) {
        alert('Please enter an application name');
        return;
    }
    
    // Check if app control already exists
    if (mockData.appControls.some(a => a.application === application)) {
        alert('This application is already in the list');
        return;
    }
    
    // Create new app control
    const newAppControl = {
        id: Date.now().toString(),
        application,
        status: 'blocked'
    };
    
    // Add to app controls array
    mockData.appControls.push(newAppControl);
    
    // Save to localStorage
    localStorage.setItem('lecturerMockData', JSON.stringify(mockData));
    
    // Close modal
    closeModal('add-app-control-modal');
    
    // Reload app controls
    loadAppControls();
    
    // Add activity
    addActivity(`Added new application control: ${newAppControl.application}`);
}

// Delete app control
function deleteAppControl(appControlId) {
    if (!confirm('Are you sure you want to delete this application control?')) {
        return;
    }
    
    const appControlIndex = mockData.appControls.findIndex(a => a.id === appControlId);
    if (appControlIndex === -1) {
        alert('Application control not found');
        return;
    }
    
    const appControl = mockData.appControls[appControlIndex];
    
    // Remove app control
    mockData.appControls.splice(appControlIndex, 1);
    
    // Save to localStorage
    localStorage.setItem('lecturerMockData', JSON.stringify(mockData));
    
    // Reload app controls
    loadAppControls();
    
    // Add activity
    addActivity(`Deleted application control: ${appControl.application}`);
}

// Save head movement settings
function saveHeadMovementSettings() {
    const threshold = document.getElementById('movement-threshold').value;
    const sensitivity = document.getElementById('detection-sensitivity').value;
    const warningCount = document.getElementById('warning-count').value;
    
    // In a real app, this would save the settings to the server
    alert('Head movement detection settings saved successfully!');
    
    // Add activity
    addActivity('Updated head movement detection settings');
}

// Update threshold value display
function updateThresholdValue(value) {
    document.getElementById('threshold-value').textContent = value + '°';
}

// Load plagiarism reports and submissions
function loadPlagiarismReports() {
    // Load submissions for plagiarism check
    loadPlagiarismSubmissions();
    
    // Load existing plagiarism reports
    const plagiarismTable = document.getElementById('plagiarism-table');
    if (!plagiarismTable) return;
    
    const tbody = plagiarismTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    // Sort plagiarism reports by submission date (newest first)
    const sortedPlagiarismReports = [...mockData.plagiarismReports].sort((a, b) => {
        return new Date(b.submissionDate) - new Date(a.submissionDate);
    });
    
    // Display plagiarism reports
    sortedPlagiarismReports.forEach(report => {
        const student = mockData.users.find(u => u.id === report.studentId);
        const exam = mockData.exams.find(e => e.id === report.examId);
        
        if (student && exam) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${student.name}</td>
                <td>${exam.name}</td>
                <td>${formatDateShort(report.submissionDate)}</td>
                <td><span class="${getSimilarityScoreClass(report.similarityScore)}">${report.similarityScore}%</span></td>
                <td>
                    <button class="action-btn" onclick="viewPlagiarismReport('${report.id}')">View Report</button>
                </td>
            `;
            tbody.appendChild(tr);
        }
    });
}

// Load submissions for plagiarism check
function loadPlagiarismSubmissions() {
    // Populate course filter
    const courseFilter = document.getElementById('plagiarism-course-filter');
    if (courseFilter) {
        courseFilter.innerHTML = '<option value="all">All Courses</option>';
        mockData.courses.forEach(course => {
            courseFilter.innerHTML += `<option value="${course.id}">${course.name}</option>`;
        });
    }
    
    // Populate exam filter
    const examFilter = document.getElementById('plagiarism-exam-filter');
    if (examFilter) {
        examFilter.innerHTML = '<option value="all">All Exams</option>';
        mockData.exams.forEach(exam => {
            examFilter.innerHTML += `<option value="${exam.id}">${exam.name}</option>`;
        });
    }
    
    // Create mock submissions if they don't exist
    if (!mockData.submissions) {
        mockData.submissions = [
            {
                id: '1',
                studentId: '1',
                studentName: 'John Doe',
                examId: '3',
                submissionDate: '2023-05-10T11:30:00Z',
                content: 'This is a sample submission for Quiz 1'
            },
            {
                id: '2',
                studentId: '2',
                studentName: 'Jane Smith',
                examId: '3',
                submissionDate: '2023-05-10T11:45:00Z',
                content: 'Another sample submission for Quiz 1'
            },
            {
                id: '3',
                studentId: '3',
                studentName: 'Michael Johnson',
                examId: '8',
                submissionDate: '2023-06-05T16:30:00Z',
                content: 'Submission for AI Fundamentals Test'
            },
            {
                id: '4',
                studentId: '1',
                studentName: 'John Doe',
                examId: '2',
                submissionDate: '2023-07-15T14:20:00Z',
                content: 'Submission for Final Exam'
            },
            {
                id: '5',
                studentId: '2',
                studentName: 'Jane Smith',
                examId: '1',
                submissionDate: '2023-06-12T10:15:00Z',
                content: 'Submission for Midterm Exam'
            },
            {
                id: '6',
                studentId: '3',
                studentName: 'Michael Johnson',
                examId: '4',
                submissionDate: '2023-05-02T09:45:00Z',
                content: 'Submission for Practice Test'
            }
        ];
        
        // Save to localStorage
        localStorage.setItem('lecturerMockData', JSON.stringify(mockData));
    }
    
    // Display submissions in the table
    const submissionsTable = document.getElementById('plagiarism-submissions-table');
    if (!submissionsTable) return;
    
    const tbody = submissionsTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    // Sort submissions by date (newest first)
    const sortedSubmissions = [...mockData.submissions].sort((a, b) => {
        return new Date(b.submissionDate) - new Date(a.submissionDate);
    });
    
    // Display submissions
    sortedSubmissions.forEach(submission => {
        const exam = mockData.exams.find(e => e.id === submission.examId);
        if (!exam) return;
        
        const course = mockData.courses.find(c => c.id === exam.courseId);
        if (!course) return;
        
        // Find student from the submission
        const student = mockData.users.find(u => u.id === submission.studentId);
        
        // Check if this submission already has a plagiarism report
        const hasReport = mockData.plagiarismReports.some(r => 
            r.examId === submission.examId && 
            r.studentId === submission.studentId
        );
        
        const status = hasReport ? 'Checked' : 'Not Checked';
        const statusClass = hasReport ? 'status-completed' : 'status-pending';
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${submission.studentName || (student ? student.name : 'Unknown Student')}</td>
            <td>${exam.name}</td>
            <td>${course ? course.name : 'Unknown Course'}</td>
            <td>${formatDateShort(submission.submissionDate)}</td>
            <td><span class="status-badge ${statusClass}">${status}</span></td>
            <td>
                ${!hasReport ? 
                    `<button class="action-btn" onclick="checkPlagiarism('${submission.id}', '${submission.studentId}')">Check Plagiarism</button>` : 
                    `<button class="action-btn" disabled>Already Checked</button>`
                }
            </td>
        `;
        tbody.appendChild(tr);
    });}


// Check plagiarism for a submission
function checkPlagiarism(submissionId, studentId) {
    // Get the submission from mockData
    const submissions = mockData.submissions || [];
    const submission = submissions.find(s => s.id === submissionId);
    
    if (!submission) {
        alert('Submission not found');
        return;
    }
    
    // In a real app, this would send the submission to a plagiarism checking service
    // For this mock, we'll generate a random similarity score
    const similarityScore = Math.floor(Math.random() * 30); // Random score between 0-29
    
    // Create a new plagiarism report
    const newReport = {
        id: Date.now().toString(),
        studentId: studentId,
        examId: submission.examId,
        submissionDate: submission.submissionDate,
        similarityScore: similarityScore
    };
    
    // Add to plagiarism reports array
    mockData.plagiarismReports.push(newReport);
    
    // Save to localStorage
    localStorage.setItem('lecturerMockData', JSON.stringify(mockData));
    
    // Add activity
    const exam = mockData.exams.find(e => e.id === submission.examId);
    const student = mockData.users.find(u => u.id === studentId);
    addActivity(`Generated plagiarism report for ${student ? student.name : 'student'}'s ${exam ? exam.name : 'exam'}`);
    
    // Reload plagiarism reports
    loadPlagiarismReports();
    
    // Show success message
    alert(`Plagiarism check completed. Similarity score: ${similarityScore}%`);
}

// Get similarity score class based on score value
function getSimilarityScoreClass(score) {
    if (score < 10) return 'score-low';
    if (score < 30) return 'score-medium';
    return 'score-high';
}

// Filter submissions based on course and exam filters
function filterPlagiarismSubmissions() {
    const courseFilter = document.getElementById('plagiarism-course-filter').value;
    const examFilter = document.getElementById('plagiarism-exam-filter').value;
    
    // Get student submissions from localStorage
    const studentData = JSON.parse(localStorage.getItem('mockData')) || {};
    const submissions = studentData.submissions || [];
    
    // Display submissions in the table
    const submissionsTable = document.getElementById('plagiarism-submissions-table');
    if (!submissionsTable) return;
    
    const tbody = submissionsTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    // Filter and sort submissions
    const filteredSubmissions = submissions
        .filter(submission => {
            const exam = mockData.exams.find(e => e.id === submission.examId);
            if (!exam) return false;
            
            // Apply exam filter
            if (examFilter !== 'all' && submission.examId !== examFilter) {
                return false;
            }
            
            // Apply course filter
            if (courseFilter !== 'all' && exam.courseId !== courseFilter) {
                return false;
            }
            
            return true;
        })
        .sort((a, b) => new Date(b.submissionDate) - new Date(a.submissionDate));
    
    // Display filtered submissions
    filteredSubmissions.forEach(submission => {
        const exam = mockData.exams.find(e => e.id === submission.examId);
        if (!exam) return;
        
        const course = mockData.courses.find(c => c.id === exam.courseId);
        if (!course) return;
        
        // Find student from the submission
        // In a real app, this would use the studentId from the submission
        // For this mock, we'll assume the first student
        const student = mockData.users.find(u => u.userType === 'student');
        
        // Check if this submission already has a plagiarism report
        const hasReport = mockData.plagiarismReports.some(r => 
            r.examId === submission.examId && 
            r.submissionDate === submission.submissionDate
        );
        
        const status = hasReport ? 'Checked' : 'Not Checked';
        const statusClass = hasReport ? 'status-completed' : 'status-pending';
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${student ? student.name : 'Unknown Student'}</td>
            <td>${exam.name}</td>
            <td>${course.name}</td>
            <td>${formatDateShort(submission.submissionDate)}</td>
            <td><span class="status-badge ${statusClass}">${status}</span></td>
            <td>
                ${!hasReport ? 
                    `<button class="action-btn" onclick="checkPlagiarism('${submission.id}', '${student ? student.id : '1'}')">Check Plagiarism</button>` : 
                    `<button class="action-btn" disabled>Already Checked</button>`
                }
            </td>
        `;
        tbody.appendChild(tr);
    });
    
    // Also filter the plagiarism reports table
    filterPlagiarismReports();
}

// Filter plagiarism reports based on exam filter
function filterPlagiarismReports() {
    const examFilter = document.getElementById('plagiarism-exam-filter').value;
    
    const plagiarismTable = document.getElementById('plagiarism-table');
    if (!plagiarismTable) return;
    
    const tbody = plagiarismTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    // Filter and sort plagiarism reports
    const filteredPlagiarismReports = mockData.plagiarismReports
        .filter(report => {
            // Apply exam filter
            if (examFilter !== 'all' && report.examId !== examFilter) {
                return false;
            }
            
            return true;
        })
        .sort((a, b) => new Date(b.submissionDate) - new Date(a.submissionDate));
    
    // Display filtered plagiarism reports
    filteredPlagiarismReports.forEach(report => {
        const student = mockData.users.find(u => u.id === report.studentId);
        const exam = mockData.exams.find(e => e.id === report.examId);
        
        if (student && exam) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${student.name}</td>
                <td>${exam.name}</td>
                <td>${formatDateShort(report.submissionDate)}</td>
                <td><span class="${getSimilarityScoreClass(report.similarityScore)}">${report.similarityScore}%</span></td>
                <td>
                    <button class="action-btn" onclick="viewPlagiarismReport('${report.id}')">View Report</button>
                </td>
            `;
            tbody.appendChild(tr);
        }
    });
}

// View plagiarism report
function viewPlagiarismReport(reportId) {
    const report = mockData.plagiarismReports.find(r => r.id === reportId);
    if (!report) {
        alert('Report not found');
        return;
    }
    
    const student = mockData.users.find(u => u.id === report.studentId);
    const exam = mockData.exams.find(e => e.id === report.examId);
    
    // In a real app, this would open a modal with the plagiarism report details
    alert(`Plagiarism Report:\nStudent: ${student ? student.name : 'Unknown'}\nExam: ${exam ? exam.name : 'Unknown'}\nSubmission Date: ${formatDate(report.submissionDate)}\nSimilarity Score: ${report.similarityScore}%\n\nIn a real application, this would show a detailed report with highlighted similar content.`);
}

// Load resubmission requests
function loadResubmissionRequests() {
    const resubmissionTable = document.getElementById('resubmission-requests-table');
    if (!resubmissionTable) return;
    
    const tbody = resubmissionTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    // Sort resubmission requests by request date (newest first)
    const sortedResubmissionRequests = [...mockData.resubmissionRequests].sort((a, b) => {
        return new Date(b.requestDate) - new Date(a.requestDate);
    });
    
    // Display resubmission requests
    sortedResubmissionRequests.forEach(request => {
        const student = mockData.users.find(u => u.id === request.studentId);
        const exam = mockData.exams.find(e => e.id === request.examId);
        
        if (student && exam) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${student.name}</td>
                <td>${exam.name}</td>
                <td>${formatDateShort(request.requestDate)}</td>
                <td>${request.reason}</td>
                <td><span class="status-badge ${request.status}">${capitalizeFirstLetter(request.status)}</span></td>
                <td>
                    ${request.status === 'pending' ? `
                        <button class="action-btn" onclick="approveResubmission('${request.id}')">Approve</button>
                        <button class="action-btn delete" onclick="rejectResubmission('${request.id}')">Reject</button>
                    ` : `
                        <button class="action-btn" onclick="viewResubmissionDetails('${request.id}')">View</button>
                    `}
                </td>
            `;
            tbody.appendChild(tr);
        }
    });
}

// Approve resubmission request
function approveResubmission(requestId) {
    const request = mockData.resubmissionRequests.find(r => r.id === requestId);
    if (!request) {
        alert('Request not found');
        return;
    }
    
    // Update request status
    request.status = 'approved';
    
    // Save to localStorage
    localStorage.setItem('lecturerMockData', JSON.stringify(mockData));
    
    // Reload resubmission requests
    loadResubmissionRequests();
    
    // Add activity
    const student = mockData.users.find(u => u.id === request.studentId);
    const exam = mockData.exams.find(e => e.id === request.examId);
    addActivity(`Approved resubmission request from ${student ? student.name : 'student'} for ${exam ? exam.name : 'exam'}`);
}

// Reject resubmission request
function rejectResubmission(requestId) {
    const request = mockData.resubmissionRequests.find(r => r.id === requestId);
    if (!request) {
        alert('Request not found');
        return;
    }
    
    // Update request status
    request.status = 'rejected';
    
    // Save to localStorage
    localStorage.setItem('lecturerMockData', JSON.stringify(mockData));
    
    // Reload resubmission requests
    loadResubmissionRequests();
    
    // Add activity
    const student = mockData.users.find(u => u.id === request.studentId);
    const exam = mockData.exams.find(e => e.id === request.examId);
    addActivity(`Rejected resubmission request from ${student ? student.name : 'student'} for ${exam ? exam.name : 'exam'}`);
}

// View resubmission details
function viewResubmissionDetails(requestId) {
    const request = mockData.resubmissionRequests.find(r => r.id === requestId);
    if (!request) {
        alert('Request not found');
        return;
    }
    
    const student = mockData.users.find(u => u.id === request.studentId);
    const exam = mockData.exams.find(e => e.id === request.examId);
    
    // In a real app, this would open a modal with the resubmission details
    alert(`Resubmission Request:\nStudent: ${student ? student.name : 'Unknown'}\nExam: ${exam ? exam.name : 'Unknown'}\nRequest Date: ${formatDate(request.requestDate)}\nReason: ${request.reason}\nStatus: ${capitalizeFirstLetter(request.status)}`);
}

// Load integrity reports
function loadIntegrityReports() {
    // Load courses for filter
    const courseFilter = document.getElementById('integrity-course-filter');
    if (courseFilter) {
        courseFilter.innerHTML = '<option value="all">All Courses</option>';
        mockData.courses.forEach(course => {
            courseFilter.innerHTML += `<option value="${course.id}">${course.name}</option>`;
        });
    }
    
    // Load exams for filter
    const examFilter = document.getElementById('integrity-exam-filter');
    if (examFilter) {
        examFilter.innerHTML = '<option value="all">All Exams</option>';
        mockData.exams.forEach(exam => {
            examFilter.innerHTML += `<option value="${exam.id}">${exam.name}</option>`;
        });
    }
    
    // Set default date range (last 30 days)
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    
    const dateFrom = document.getElementById('integrity-date-from');
    const dateTo = document.getElementById('integrity-date-to');
    
    if (dateFrom && !dateFrom.value) {
        dateFrom.value = thirtyDaysAgo.toISOString().split('T')[0];
    }
    
    if (dateTo && !dateTo.value) {
        dateTo.value = today.toISOString().split('T')[0];
    }
    
    // Load all report types
    loadExamEvidenceReports();
    loadStudentBehaviorReports();
    loadViolationAnalysisReports();
}

// Load exam evidence reports
function loadExamEvidenceReports() {
    const evidenceTable = document.getElementById('evidence-table');
    if (!evidenceTable) return;
    
    const tbody = evidenceTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    // Apply filters
    const courseFilter = document.getElementById('integrity-course-filter');
    const examFilter = document.getElementById('integrity-exam-filter');
    const dateFrom = document.getElementById('integrity-date-from');
    const dateTo = document.getElementById('integrity-date-to');
    
    const courseId = courseFilter ? courseFilter.value : 'all';
    const examId = examFilter ? examFilter.value : 'all';
    const fromDate = dateFrom ? new Date(dateFrom.value) : null;
    const toDate = dateTo ? new Date(dateTo.value) : null;
    
    // Set end of day for toDate
    if (toDate) {
        toDate.setHours(23, 59, 59, 999);
    }
    
    // Sort integrity reports by timestamp (newest first)
    const filteredReports = mockData.integrityReports.filter(report => {
        const reportDate = new Date(report.timestamp);
        const exam = mockData.exams.find(e => e.id === report.examId);
        
        // Apply course filter
        if (courseId !== 'all' && (!exam || exam.courseId !== courseId)) {
            return false;
        }
        
        // Apply exam filter
        if (examId !== 'all' && report.examId !== examId) {
            return false;
        }
        
        // Apply date range filter
        if (fromDate && reportDate < fromDate) {
            return false;
        }
        
        if (toDate && reportDate > toDate) {
            return false;
        }
        
        return true;
    }).sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
    });
    
    // Display evidence reports
    filteredReports.forEach(report => {
        const student = mockData.users.find(u => u.id === report.studentId);
        const exam = mockData.exams.find(e => e.id === report.examId);
        
        if (student && exam) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${student.name}</td>
                <td>${exam.name}</td>
                <td>${formatDateShort(report.timestamp)}</td>
                <td>${report.behavior}</td>
                <td class="evidence-icons">
                    <img src="${report.screenshot}" class="evidence-thumbnail" onclick="viewEvidenceModal('${report.id}', 'image')">
                    <div class="evidence-icon" onclick="viewEvidenceModal('${report.id}', 'video')">
                        <i class="fas fa-video"></i>
                    </div>
                </td>
                <td>
                    <button class="action-btn" onclick="viewIntegrityReport('${report.id}')">View Details</button>
                </td>
            `;
            tbody.appendChild(tr);
        }
    });
}

// Load student behavior reports
function loadStudentBehaviorReports() {
    const behaviorTable = document.getElementById('behavior-table');
    if (!behaviorTable) return;
    
    const tbody = behaviorTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    // Apply filters
    const courseFilter = document.getElementById('integrity-course-filter');
    const examFilter = document.getElementById('integrity-exam-filter');
    const dateFrom = document.getElementById('integrity-date-from');
    const dateTo = document.getElementById('integrity-date-to');
    
    const courseId = courseFilter ? courseFilter.value : 'all';
    const examId = examFilter ? examFilter.value : 'all';
    const fromDate = dateFrom ? new Date(dateFrom.value) : null;
    const toDate = dateTo ? new Date(dateTo.value) : null;
    
    // Set end of day for toDate
    if (toDate) {
        toDate.setHours(23, 59, 59, 999);
    }
    
    // Get all students
    const students = mockData.users.filter(user => user.userType === 'student');
    
    // For each student, calculate behavior statistics
    students.forEach(student => {
        // Filter reports for this student
        const studentReports = mockData.integrityReports.filter(report => {
            const reportDate = new Date(report.timestamp);
            const exam = mockData.exams.find(e => e.id === report.examId);
            
            // Apply course filter
            if (courseId !== 'all' && (!exam || exam.courseId !== courseId)) {
                return false;
            }
            
            // Apply exam filter
            if (examId !== 'all' && report.examId !== examId) {
                return false;
            }
            
            // Apply date range filter
            if (fromDate && reportDate < fromDate) {
                return false;
            }
            
            if (toDate && reportDate > toDate) {
                return false;
            }
            
            return report.studentId === student.id;
        });
        
        // If no reports match the filters, skip this student
        if (studentReports.length === 0) {
            return;
        }
        
        // Count different types of incidents
        const headMovementCount = studentReports.filter(r => r.behavior.toLowerCase().includes('head movement')).length;
        const appSwitchCount = studentReports.filter(r => r.behavior.toLowerCase().includes('switch application')).length;
        const multiplePeopleCount = studentReports.filter(r => r.behavior.toLowerCase().includes('multiple people')).length;
        const audioCount = studentReports.filter(r => r.behavior.toLowerCase().includes('audio')).length;
        const totalFlags = studentReports.length;
        
        // Count unique exams this student has taken
        const uniqueExams = new Set(studentReports.map(r => r.examId)).size;
        
        // Create table row
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${student.name}</td>
            <td>${uniqueExams}</td>
            <td>${headMovementCount}</td>
            <td>${appSwitchCount}</td>
            <td>${multiplePeopleCount}</td>
            <td>${audioCount}</td>
            <td><strong>${totalFlags}</strong></td>
            <td>
                <button class="action-btn" onclick="viewStudentBehaviorDetails('${student.id}')">View Details</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Load violation analysis reports
function loadViolationAnalysisReports() {
    // This would typically involve more complex data processing and visualization
    // For this demo, we're using placeholder charts with static data
    // In a real application, you would calculate these values from the actual data
    
    // Example of how you might update the charts with real data:
    updateViolationTypeChart();
    updateViolationsByExamChart();
    updateAnalysisSummary();
}

// Update violation type chart with real data
function updateViolationTypeChart() {
    // Count violations by type
    const headMovementCount = mockData.integrityReports.filter(r => r.behavior.toLowerCase().includes('head movement')).length;
    const appSwitchCount = mockData.integrityReports.filter(r => r.behavior.toLowerCase().includes('switch application')).length;
    const multiplePeopleCount = mockData.integrityReports.filter(r => r.behavior.toLowerCase().includes('multiple people')).length;
    const audioCount = mockData.integrityReports.filter(r => r.behavior.toLowerCase().includes('audio')).length;
    const keyboardCount = mockData.integrityReports.filter(r => r.behavior.toLowerCase().includes('keyboard')).length;
    
    // Find the maximum count for scaling
    const maxCount = Math.max(headMovementCount, appSwitchCount, multiplePeopleCount, audioCount, keyboardCount);
    
    // Update chart bars
    const chartContainer = document.getElementById('violation-types-chart');
    if (!chartContainer) return;
    
    const chartBars = chartContainer.querySelector('.chart-bars');
    if (!chartBars) return;
    
    const bars = chartBars.querySelectorAll('.chart-bar');
    if (bars.length >= 5) {
        // Update heights and values
        updateChartBar(bars[0], headMovementCount, maxCount, 'Head Movement');
        updateChartBar(bars[1], appSwitchCount, maxCount, 'App Switch');
        updateChartBar(bars[2], multiplePeopleCount, maxCount, 'Multiple People');
        updateChartBar(bars[3], audioCount, maxCount, 'Audio');
        updateChartBar(bars[4], keyboardCount, maxCount, 'Keyboard');
    }
}

// Update violations by exam chart
function updateViolationsByExamChart() {
    // Group violations by exam
    const violationsByExam = {};
    
    mockData.integrityReports.forEach(report => {
        const exam = mockData.exams.find(e => e.id === report.examId);
        if (exam) {
            if (!violationsByExam[exam.name]) {
                violationsByExam[exam.name] = 0;
            }
            violationsByExam[exam.name]++;
        }
    });
    
    // Convert to array and sort by count (descending)
    const sortedViolations = Object.entries(violationsByExam)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 4); // Take top 4
    
    // Find the maximum count for scaling
    const maxCount = sortedViolations.length > 0 ? sortedViolations[0].count : 0;
    
    // Update chart bars
    const chartContainer = document.getElementById('violations-by-exam-chart');
    if (!chartContainer) return;
    
    const chartBars = chartContainer.querySelector('.chart-bars');
    if (!chartBars) return;
    
    const bars = chartBars.querySelectorAll('.chart-bar');
    if (bars.length >= 4 && sortedViolations.length >= 4) {
        // Update widths and values for horizontal bars
        for (let i = 0; i < 4; i++) {
            const bar = bars[i];
            const data = sortedViolations[i];
            if (bar && data) {
                const percentage = (data.count / maxCount) * 100;
                bar.style.width = `${percentage}%`;
                
                const barLabel = bar.querySelector('.bar-label');
                const barValue = bar.querySelector('.bar-value');
                
                if (barLabel) barLabel.textContent = data.name;
                if (barValue) barValue.textContent = data.count;
            }
        }
    }
}

// Update analysis summary
function updateAnalysisSummary() {
    // This would typically involve more complex analysis
    // For this demo, we're using static content
    // In a real application, you would generate insights based on the actual data
}

// Helper function to update a chart bar
function updateChartBar(bar, value, maxValue, label) {
    if (!bar) return;
    
    const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
    bar.style.height = `${percentage}%`;
    
    const barLabel = bar.querySelector('.bar-label');
    const barValue = bar.querySelector('.bar-value');
    
    if (barLabel) barLabel.textContent = label;
    if (barValue) barValue.textContent = value;
}

// View integrity report
function viewIntegrityReport(reportId) {
    const report = mockData.integrityReports.find(r => r.id === reportId);
    if (!report) {
        alert('Report not found');
        return;
    }
    
    // Open the evidence modal with the report details
    viewEvidenceModal(reportId, 'image');
}

// View evidence modal
function viewEvidenceModal(reportId, mediaType) {
    const report = mockData.integrityReports.find(r => r.id === reportId);
    if (!report) {
        alert('Report not found');
        return;
    }
    
    const student = mockData.users.find(u => u.id === report.studentId);
    const exam = mockData.exams.find(e => e.id === report.examId);
    
    // Check if modal exists, create if not
    let modal = document.getElementById('evidence-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'evidence-modal';
        modal.className = 'evidence-modal';
        modal.innerHTML = `
            <div class="evidence-modal-content">
                <button class="evidence-modal-close" onclick="closeEvidenceModal()">&times;</button>
                <h2>Integrity Violation Evidence</h2>
                <div class="evidence-media" id="evidence-media-container"></div>
                <div class="evidence-details">
                    <h3>Incident Details</h3>
                    <dl>
                        <dt>Student:</dt>
                        <dd id="evidence-student"></dd>
                        
                        <dt>Exam:</dt>
                        <dd id="evidence-exam"></dd>
                        
                        <dt>Date/Time:</dt>
                        <dd id="evidence-datetime"></dd>
                        
                        <dt>Incident:</dt>
                        <dd id="evidence-incident"></dd>
                        
                        <dt>Duration:</dt>
                        <dd id="evidence-duration"></dd>
                        
                        <dt>Severity:</dt>
                        <dd id="evidence-severity"></dd>
                        
                        <dt>Description:</dt>
                        <dd id="evidence-description"></dd>
                        
                        <dt>Action Taken:</dt>
                        <dd id="evidence-action"></dd>
                    </dl>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    // Update modal content
    const mediaContainer = document.getElementById('evidence-media-container');
    if (mediaContainer) {
        if (mediaType === 'video') {
            // In a real app, this would be a real video path
            mediaContainer.innerHTML = `
                <video controls>
                    <source src="https://via.placeholder.com/640x360.mp4?text=Violation+Recording" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <p>Recording of incident at ${formatDate(report.timestamp)}</p>
            `;
        } else {
            // Use the screenshot from the report
            mediaContainer.innerHTML = `
                <img src="${report.screenshot || 'https://via.placeholder.com/640x360?text=Violation+Screenshot'}" alt="Violation Evidence">
                <p>Screenshot of incident at ${formatDate(report.timestamp)}</p>
            `;
        }
    }
    
    // Update details
    document.getElementById('evidence-student').textContent = student ? student.name : 'Unknown';
    document.getElementById('evidence-exam').textContent = exam ? exam.name : 'Unknown';
    document.getElementById('evidence-datetime').textContent = formatDate(report.timestamp);
    document.getElementById('evidence-incident').textContent = report.behavior;
    document.getElementById('evidence-duration').textContent = report.duration || 'N/A';
    
    const severityElement = document.getElementById('evidence-severity');
    if (severityElement) {
        severityElement.innerHTML = `<span class="severity-badge ${report.severity}">${capitalizeFirstLetter(report.severity)}</span>`;
    }
    
    document.getElementById('evidence-description').textContent = report.description || 'No description available';
    document.getElementById('evidence-action').textContent = report.actionTaken || 'No action recorded';
    
    // Show modal
    modal.classList.add('active');
}

// Close evidence modal
function closeEvidenceModal() {
    const modal = document.getElementById('evidence-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Generate integrity report
function generateIntegrityReport() {
    // In a real app, this would generate a PDF or Excel report
    alert('Integrity report generated successfully!');
    
    // Add activity
    addActivity('Generated integrity report');
}

// Show report tab
function showReportTab(tabId) {
    // Hide all report tab content
    document.querySelectorAll('.report-tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('.report-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show the selected tab content
    document.getElementById(tabId).classList.add('active');
    
    // Add active class to the clicked tab button
    document.querySelector(`.tab-btn[onclick="showReportTab('${tabId}')"]`).classList.add('active');
}

// Filter integrity reports
function filterIntegrityReports() {
    // Reload all report types with the current filters
    loadExamEvidenceReports();
    loadStudentBehaviorReports();
    loadViolationAnalysisReports();
}

// View student behavior details
function viewStudentBehaviorDetails(studentId) {
    const student = mockData.users.find(u => u.id === studentId);
    if (!student) {
        alert('Student not found');
        return;
    }
    
    // Filter reports for this student
    const studentReports = mockData.integrityReports.filter(report => report.studentId === studentId);
    
    // Count different types of incidents
    const headMovementCount = studentReports.filter(r => r.behavior.toLowerCase().includes('head movement')).length;
    const appSwitchCount = studentReports.filter(r => r.behavior.toLowerCase().includes('switch application')).length;
    const multiplePeopleCount = studentReports.filter(r => r.behavior.toLowerCase().includes('multiple people')).length;
    const audioCount = studentReports.filter(r => r.behavior.toLowerCase().includes('audio')).length;
    const totalFlags = studentReports.length;
    
    // In a real app, this would open a detailed modal with charts and incident history
    alert(`Student Behavior Report: ${student.name}\n\nTotal Flags: ${totalFlags}\nHead Movement Incidents: ${headMovementCount}\nApplication Switching: ${appSwitchCount}\nMultiple People Detected: ${multiplePeopleCount}\nAudio Violations: ${audioCount}\n\nIn a real application, this would show detailed charts and incident history.`);
}

// Format date for display (short format)
function formatDateShort(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
}

// Format date for display (with time)
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString();
}

// Capitalize first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Add activity to the activities list
function addActivity(description) {
    const newActivity = {
        id: Date.now().toString(),
        description,
        timestamp: new Date().toISOString()
    };
    
    // Add to activities array
    mockData.activities.unshift(newActivity);
    
    // Limit activities to 20
    if (mockData.activities.length > 20) {
        mockData.activities = mockData.activities.slice(0, 20);
    }
    
    // Save to localStorage
    localStorage.setItem('lecturerMockData', JSON.stringify(mockData));
    
    // Reload activities
    loadRecentActivities();
}

// Show modal
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        
        // Populate select options if needed
        if (modalId === 'add-user-modal') {
            // No need to populate anything
        } else if (modalId === 'add-exam-modal') {
            const courseSelect = document.getElementById('exam-course');
            if (courseSelect) {
                courseSelect.innerHTML = '';
                mockData.courses.forEach(course => {
                    courseSelect.innerHTML += `<option value="${course.id}">${course.name}</option>`;
                });
            }
        } else if (modalId === 'add-enrollment-modal') {
            const studentSelect = document.getElementById('enrollment-student');
            const courseSelect = document.getElementById('enrollment-course');
            
            if (studentSelect) {
                studentSelect.innerHTML = '';
                mockData.users
                    .filter(user => user.userType === 'student')
                    .forEach(student => {
                        studentSelect.innerHTML += `<option value="${student.id}">${student.name}</option>`;
                    });
            }
            
            if (courseSelect) {
                courseSelect.innerHTML = '';
                mockData.courses.forEach(course => {
                    courseSelect.innerHTML += `<option value="${course.id}">${course.name}</option>`;
                });
            }
        } else if (modalId === 'add-schedule-modal') {
            const examSelect = document.getElementById('schedule-exam');
            if (examSelect) {
                examSelect.innerHTML = '';
                mockData.exams.forEach(exam => {
                    examSelect.innerHTML += `<option value="${exam.id}">${exam.name}</option>`;
                });
            }
        }
    }
}

// Close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Initialize modals
function initializeModals() {
    // Close modals when clicking outside the modal content
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', function(event) {
            if (event.target === this) {
                this.style.display = 'none';
            }
        });
    });
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to log out?')) {
        // Clear current user
        localStorage.removeItem('currentUser');
        
        // Redirect to login page
        window.location.href = 'index.html';
    }
}