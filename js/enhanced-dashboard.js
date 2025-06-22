/**
 * Enhanced Dashboard JavaScript
 * This file handles improved section visibility and transitions
 */

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize section visibility
    initializeSections();
    
    // Add event listeners to menu items
    addMenuListeners();
    
    // Update active section based on URL hash if present
    handleUrlHash();
});

/**
 * Initialize all sections, hiding them except for the default one
 */
function initializeSections() {
    // Hide all sections initially
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show the default section (dashboard-home)
    const defaultSection = document.getElementById('dashboard-home');
    if (defaultSection) {
        defaultSection.classList.add('active');
    }
    
    // Set the default active menu item
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const defaultMenuItem = document.querySelector('.menu-item[onclick="showSection(\'dashboard-home\')"]');
    if (defaultMenuItem) {
        defaultMenuItem.classList.add('active');
    }
}

/**
 * Add click event listeners to all menu items
 */
function addMenuListeners() {
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function(e) {
            // Prevent default action
            e.preventDefault();
            
            // Get the section ID from the onclick attribute
            const onclickAttr = this.getAttribute('onclick');
            if (onclickAttr) {
                const match = onclickAttr.match(/showSection\('([^']+)'\)/);
                if (match && match[1]) {
                    const sectionId = match[1];
                    showSection(sectionId);
                    
                    // Update URL hash
                    window.location.hash = sectionId;
                }
            }
        });
    });
}

/**
 * Handle URL hash to show the corresponding section
 */
function handleUrlHash() {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        showSection(hash);
    }
}

/**
 * Show the specified section with smooth transition
 * @param {string} sectionId - The ID of the section to show
 */
function showSection(sectionId) {
    // Get the section element
    const sectionToShow = document.getElementById(sectionId);
    if (!sectionToShow) return;
    
    // Hide all sections with fade-out effect
    const allSections = document.querySelectorAll('.section');
    allSections.forEach(section => {
        if (section.classList.contains('active')) {
            // Add fade-out class
            section.classList.add('fade-out');
            
            // Remove active and fade-out classes after animation
            setTimeout(() => {
                section.classList.remove('active');
                section.classList.remove('fade-out');
            }, 300); // Match this with CSS transition duration
        } else {
            section.classList.remove('active');
        }
    });
    
    // Show the selected section with fade-in effect after a short delay
    setTimeout(() => {
        sectionToShow.classList.add('active');
    }, 310);
    
    // Update active menu item
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const activeMenuItem = document.querySelector(`.menu-item[onclick="showSection('${sectionId}')"]`);
    if (activeMenuItem) {
        activeMenuItem.classList.add('active');
        
        // Update section title
        const sectionTitle = activeMenuItem.textContent.trim();
        const sectionTitleElement = document.getElementById('section-title');
        if (sectionTitleElement) {
            sectionTitleElement.textContent = sectionTitle;
        }
    }
    
    // Scroll to top of the section
    document.querySelector('.main-content').scrollTop = 0;
}

/**
 * Update dashboard stats with animation
 */
function animateStats() {
    const statElements = document.querySelectorAll('.stat-card h3');
    
    statElements.forEach(element => {
        const targetValue = parseInt(element.textContent, 10);
        animateValue(element, 0, targetValue, 1500);
    });
}

/**
 * Animate a value from start to end
 * @param {Element} element - The element to update
 * @param {number} start - Starting value
 * @param {number} end - Ending value
 * @param {number} duration - Animation duration in milliseconds
 */
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

/**
 * Show a modal with fade-in effect
 * @param {string} modalId - The ID of the modal to show
 */
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    // Add active class to show the modal
    modal.classList.add('active');
    
    // Add active class to modal backdrop after a short delay
    setTimeout(() => {
        modal.querySelector('.modal-backdrop').classList.add('active');
        modal.querySelector('.modal-content').classList.add('active');
    }, 10);
    
    // Add close event listeners
    const closeButtons = modal.querySelectorAll('.modal-close, .modal-cancel');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => hideModal(modalId));
    });
    
    // Close modal when clicking on backdrop
    modal.querySelector('.modal-backdrop').addEventListener('click', (e) => {
        if (e.target === modal.querySelector('.modal-backdrop')) {
            hideModal(modalId);
        }
    });
}

/**
 * Hide a modal with fade-out effect
 * @param {string} modalId - The ID of the modal to hide
 */
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    // Remove active class from modal content and backdrop
    modal.querySelector('.modal-content').classList.remove('active');
    modal.querySelector('.modal-backdrop').classList.remove('active');
    
    // Remove active class from modal after animation completes
    setTimeout(() => {
        modal.classList.remove('active');
    }, 300); // Match this with CSS transition duration
}

/**
 * Logout function
 */
function logout() {
    // Clear user data from localStorage
    localStorage.removeItem('currentUser');
    
    // Redirect to login page
    window.location.href = 'index.html';
}

/**
 * Filter table rows based on search input
 * @param {string} tableId - The ID of the table to filter
 * @param {string} inputId - The ID of the search input
 */
function filterTable(tableId, inputId) {
    const input = document.getElementById(inputId);
    const filter = input.value.toUpperCase();
    const table = document.getElementById(tableId);
    const rows = table.getElementsByTagName('tr');
    
    // Loop through all table rows, and hide those who don't match the search query
    for (let i = 1; i < rows.length; i++) { // Start from 1 to skip header row
        let found = false;
        const cells = rows[i].getElementsByTagName('td');
        
        for (let j = 0; j < cells.length; j++) {
            const cell = cells[j];
            if (cell) {
                const text = cell.textContent || cell.innerText;
                if (text.toUpperCase().indexOf(filter) > -1) {
                    found = true;
                    break;
                }
            }
        }
        
        rows[i].style.display = found ? '' : 'none';
    }
}

/**
 * Apply custom styles to tables for better readability
 */
function enhanceTables() {
    const tables = document.querySelectorAll('table');
    
    tables.forEach(table => {
        // Add zebra striping
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach((row, index) => {
            if (index % 2 === 1) {
                row.classList.add('table-row-alt');
            }
        });
        
        // Add hover effect
        rows.forEach(row => {
            row.addEventListener('mouseenter', () => {
                row.classList.add('table-row-hover');
            });
            
            row.addEventListener('mouseleave', () => {
                row.classList.remove('table-row-hover');
            });
        });
    });
}

// Call enhanceTables when the page loads
document.addEventListener('DOMContentLoaded', enhanceTables);