// Secret Santa Assignment Logic
class SecretSanta {
    constructor() {
        this.allNames = [
            'Susan', 'Fadi', 'Alex O', 'Jenny Drew', 'Laetitia', 'Raphaël', 
            'Tanya', 'Alex B', 'Jack', 'Sarah', 'Grammie', 'Elkin', 'Bobby', 'Colby'
        ];
        
        // Names that already have assignments (can input them)
        this.adminNames = ['Alex O', 'Raphaël'];
        
        this.assignments = {};
        this.useFirebase = false;
        this.loading = true;
        
        // Try to initialize Firebase, fallback to localStorage
        this.initStorage();
    }

    async initStorage() {
        // Wait a bit for Firebase to initialize
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Check if Firebase is available and configured
        if (window.firebaseReady && typeof firebase !== 'undefined' && firebase.database) {
            this.useFirebase = true;
            this.database = firebase.database();
            await this.loadAssignmentsFromFirebase();
        } else {
            // Fallback to localStorage
            this.assignments = this.loadAssignmentsFromLocal();
            this.loading = false;
            this.initializeUI();
            this.checkAndAssignRemaining();
        }
    }

    loadAssignmentsFromLocal() {
        const saved = localStorage.getItem('secretSantaAssignments');
        return saved ? JSON.parse(saved) : {};
    }

    saveAssignmentsToLocal() {
        localStorage.setItem('secretSantaAssignments', JSON.stringify(this.assignments));
    }

    async loadAssignmentsFromFirebase() {
        try {
            const assignmentsRef = this.database.ref('assignments');
            
            return new Promise((resolve) => {
                assignmentsRef.on('value', (snapshot) => {
                    const data = snapshot.val();
                    this.assignments = data || {};
                    this.loading = false;
                    
                    if (!this.uiInitialized) {
                        this.initializeUI();
                        this.checkAndAssignRemaining();
                        this.uiInitialized = true;
                    } else {
                        this.updateUI();
                    }
                    resolve();
                }, (error) => {
                    console.error('Firebase error:', error);
                    // Fallback to localStorage
                    this.useFirebase = false;
                    this.assignments = this.loadAssignmentsFromLocal();
                    this.loading = false;
                    if (!this.uiInitialized) {
                        this.initializeUI();
                        this.checkAndAssignRemaining();
                        this.uiInitialized = true;
                    }
                    resolve();
                });
            });
        } catch (error) {
            console.error('Error loading from Firebase:', error);
            this.useFirebase = false;
            this.assignments = this.loadAssignmentsFromLocal();
            this.loading = false;
            if (!this.uiInitialized) {
                this.initializeUI();
                this.checkAndAssignRemaining();
                this.uiInitialized = true;
            }
        }
    }

    async saveAssignments() {
        if (this.useFirebase) {
            try {
                await this.database.ref('assignments').set(this.assignments);
            } catch (error) {
                console.error('Error saving to Firebase:', error);
                // Fallback to localStorage
                this.saveAssignmentsToLocal();
            }
        } else {
            this.saveAssignmentsToLocal();
        }
    }

    updateUI() {
        this.updateAssignmentsView();
        this.updateParticipantSection();
    }

    canViewAssignments() {
        // Check if both admins have entered their assignments
        const assignedAdmins = this.adminNames.filter(name => this.assignments[name]);
        return assignedAdmins.length >= 2;
    }

    initializeUI() {
        if (this.loading) {
            // Show loading message
            const participantSection = document.getElementById('participantSection');
            participantSection.innerHTML = '<p style="text-align: center; padding: 20px;">Loading assignments...</p>';
            return;
        }

        // Populate name dropdowns
        const adminNameSelect = document.getElementById('adminName');
        const participantNameSelect = document.getElementById('participantName');
        const adminAssignmentSelect = document.getElementById('adminAssignment');

        // Populate admin dropdown with Alex O, Alex B, and Raphaël
        this.adminNames.forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            adminNameSelect.appendChild(option);
        });

        // Populate participant dropdown (all names for viewing assignments)
        this.allNames.forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            participantNameSelect.appendChild(option);
        });

        // Populate admin assignment dropdown (exclude the admin themselves)
        adminNameSelect.addEventListener('change', (e) => {
            const selectedAdmin = e.target.value;
            adminAssignmentSelect.innerHTML = '<option value="">Select person...</option>';
            
            if (selectedAdmin) {
                this.allNames
                    .filter(name => name !== selectedAdmin)
                    .forEach(name => {
                        const option = document.createElement('option');
                        option.value = name;
                        option.textContent = name;
                        // Pre-select if already assigned
                        if (this.assignments[selectedAdmin] === name) {
                            option.selected = true;
                        }
                        adminAssignmentSelect.appendChild(option);
                    });
            }
        });

        // Check if participant already has assignment
        participantNameSelect.addEventListener('change', (e) => {
            const selectedName = e.target.value;
            const drawButton = document.getElementById('drawButton');
            
            if (!selectedName) {
                drawButton.disabled = true;
                return;
            }

            // Check if admins have entered their assignments
            if (!this.canViewAssignments()) {
                drawButton.disabled = true;
                drawButton.textContent = '⏳ Waiting for Alex O and Raphaël...';
                document.getElementById('resultsSection').style.display = 'none';
                
                // Show message
                const participantSection = document.getElementById('participantSection');
                let messageDiv = participantSection.querySelector('.waiting-message');
                if (!messageDiv) {
                    messageDiv = document.createElement('div');
                    messageDiv.className = 'waiting-message';
                    messageDiv.style.cssText = 'background: #fff3cd; color: #856404; padding: 15px; border-radius: 8px; margin-top: 15px; text-align: center; border: 2px solid #ffc107;';
                    messageDiv.innerHTML = '⏳ Please wait for Alex O and Raphaël to enter their assignments first!';
                    participantSection.appendChild(messageDiv);
                }
                return;
            }

            // Remove waiting message if it exists
            const waitingMessage = document.getElementById('participantSection').querySelector('.waiting-message');
            if (waitingMessage) {
                waitingMessage.remove();
            }

            if (this.assignments[selectedName]) {
                drawButton.disabled = false;
                drawButton.textContent = '🎁 View My Person!';
            } else {
                drawButton.disabled = true;
                drawButton.textContent = '⏳ Waiting for assignment...';
                document.getElementById('resultsSection').style.display = 'none';
            }
        });

        // Save admin assignment
        document.getElementById('saveAdminAssignment').addEventListener('click', async () => {
            const adminName = adminNameSelect.value;
            const assignment = adminAssignmentSelect.value;

            if (!adminName || !assignment) {
                alert('Please select both your name and your assignment!');
                return;
            }

            this.assignments[adminName] = assignment;
            await this.saveAssignments();
            alert(`✓ Saved! ${adminName} is buying a gift for ${assignment}`);
            
            // Reset form
            adminNameSelect.value = '';
            adminAssignmentSelect.innerHTML = '<option value="">Select person...</option>';
            
            // Check if we need to assign everyone else
            this.checkAndAssignRemaining();
            
            // Update participant section to reflect new state
            this.updateParticipantSection();
        });

        // View assignment button (changed from draw)
        document.getElementById('drawButton').addEventListener('click', () => {
            const participantName = participantNameSelect.value;
            if (!participantName) return;

            // Double-check that admins have entered
            if (!this.canViewAssignments()) {
                alert('⏳ Please wait for Alex O and Raphaël to enter their assignments first!');
                return;
            }

            if (this.assignments[participantName]) {
                this.showResult(participantName, this.assignments[participantName]);
            } else {
                alert('You don\'t have an assignment yet. Please wait for Alex O and Raphaël to enter theirs first.');
            }
        });

        // Toggle assignments view (with password protection)
        document.getElementById('toggleViewButton').addEventListener('click', () => {
            this.toggleAssignmentsView();
        });

        // Load existing assignments for display
        this.updateAssignmentsView();
    }

    async checkAndAssignRemaining() {
        // Check if at least 2 admin names have assignments (Alex and Raphaël)
        const assignedAdmins = this.adminNames.filter(name => this.assignments[name]);
        
        if (assignedAdmins.length < 2) {
            return; // Wait for at least Alex and Raphaël to input their assignments
        }
        
        // Also check if we've already assigned everyone else (don't reassign)
        const unassigned = this.allNames.filter(name => 
            !this.assignments[name] && !this.adminNames.includes(name)
        );
        
        if (unassigned.length === 0 && Object.keys(this.assignments).length > 0) {
            // Everyone is already assigned, just update the view
            this.updateAssignmentsView();
            return;
        }

        // Assign everyone else randomly
        await this.assignRemainingPeople();
    }

    async assignRemainingPeople() {
        // Get people who need assignments (not admins, not already assigned)
        const unassigned = this.allNames.filter(name => 
            !this.assignments[name] && !this.adminNames.includes(name)
        );

        if (unassigned.length === 0) {
            return;
        }

        // Get people already assigned as receivers
        const assignedReceivers = new Set(Object.values(this.assignments));
        
        // Get available receivers (everyone not already assigned)
        let availableReceivers = this.allNames.filter(name => 
            !assignedReceivers.has(name)
        );

        // Shuffle available receivers
        availableReceivers = availableReceivers.sort(() => Math.random() - 0.5);

        // Try to assign - ensure no one gets themselves
        // Use a retry mechanism if we get stuck
        let attempts = 0;
        const maxAttempts = 100;
        
        while (attempts < maxAttempts) {
            const tempAssignments = {};
            const usedReceivers = new Set();
            let success = true;
            
            // Shuffle unassigned list
            const shuffledGivers = [...unassigned].sort(() => Math.random() - 0.5);
            
            for (const giver of shuffledGivers) {
                // Find available receivers (not themselves, not already used in this round)
                const possibleReceivers = availableReceivers.filter(r => 
                    r !== giver && !usedReceivers.has(r)
                );
                
                if (possibleReceivers.length === 0) {
                    success = false;
                    break;
                }
                
                // Randomly pick one
                const receiver = possibleReceivers[Math.floor(Math.random() * possibleReceivers.length)];
                tempAssignments[giver] = receiver;
                usedReceivers.add(receiver);
            }
            
            if (success) {
                // Apply the assignments
                Object.assign(this.assignments, tempAssignments);
                await this.saveAssignments();
                this.updateAssignmentsView();
                this.updateParticipantSection();
                
                // Show notification
                const adminSection = document.getElementById('adminSection');
                const statusDiv = document.createElement('div');
                statusDiv.className = 'status-message';
                statusDiv.innerHTML = '✅ All assignments complete! Everyone can now view their person.';
                statusDiv.style.cssText = 'background: #4caf50; color: white; padding: 15px; border-radius: 8px; margin-top: 15px; text-align: center; font-weight: bold;';
                
                // Remove existing status if any
                const existingStatus = adminSection.querySelector('.status-message');
                if (existingStatus) {
                    existingStatus.remove();
                }
                adminSection.appendChild(statusDiv);
                return;
            }
            
            attempts++;
        }
        
        // If we couldn't assign, show error
        alert('Unable to create valid assignments. Please try resetting and starting over.');
    }

    showResult(participantName, assignment) {
        document.getElementById('resultName').textContent = assignment;
        document.getElementById('resultsSection').style.display = 'block';
        
        // Scroll to result
        document.getElementById('resultsSection').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    }

    toggleAssignmentsView() {
        const view = document.getElementById('assignmentsView');
        const button = document.getElementById('toggleViewButton');
        
        // If view is hidden, require password to show it (always, regardless of admin status)
        if (view.style.display === 'none' || view.style.display === '') {
            const password = prompt('⚠️ Enter password to view all assignments:');
            if (password === null) {
                // User cancelled the prompt
                return;
            }
            if (password !== 'IAmSantaClaus') {
                alert('❌ Incorrect password! Access denied.');
                return;
            }
            // Password correct - show the view
            this.updateAssignmentsView(); // Refresh the list in case assignments changed
            view.style.display = 'block';
            button.textContent = '🙈 Hide Assignments';
        } else {
            // Hide the view (no password needed to hide)
            view.style.display = 'none';
            button.textContent = '⚠️ View All Assignments';
        }
    }

    updateAssignmentsView() {
        const list = document.getElementById('assignmentsList');
        list.innerHTML = '';

        if (Object.keys(this.assignments).length === 0) {
            list.innerHTML = '<p style="text-align: center; color: #666;">No assignments yet.</p>';
            return;
        }

        Object.entries(this.assignments).forEach(([giver, receiver]) => {
            const item = document.createElement('div');
            item.className = 'assignment-item';
            item.innerHTML = `
                <strong>${giver}</strong> 
                <span>→ ${receiver}</span>
            `;
            list.appendChild(item);
        });
    }


    updateParticipantSection() {
        // Remove any waiting messages
        const participantSection = document.getElementById('participantSection');
        const waitingMessage = participantSection.querySelector('.waiting-message');
        if (waitingMessage && this.canViewAssignments()) {
            waitingMessage.remove();
        }
        
        // Update button state
        const participantNameSelect = document.getElementById('participantName');
        const drawButton = document.getElementById('drawButton');
        const selectedName = participantNameSelect.value;
        
        if (selectedName && this.canViewAssignments() && this.assignments[selectedName]) {
            drawButton.disabled = false;
            drawButton.textContent = '🎁 View My Person!';
        } else if (selectedName && !this.canViewAssignments()) {
            drawButton.disabled = true;
            drawButton.textContent = '⏳ Waiting for Alex O and Raphaël...';
        }
    }
}

// Initialize the app when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for Firebase to load if it's being used
    setTimeout(() => {
        window.secretSantaApp = new SecretSanta();
    }, 200);
});

