const apiSource = `https://back.nileicons.com/`

// Open and close admin setting depend on role
const userRole = sessionStorage.getItem("userRole");
const userToken = sessionStorage.getItem("userToken");

if (userRole === 'admin') {
    document.getElementById('block').style.display = 'none';
    document.getElementById('blockback').style.display = 'none';
    document.body.style.overflow = 'visible';
    document.body.style.height = 'auto';
} else {
    document.getElementById('block').style.display = 'flex';
    document.getElementById('blockback').style.display = 'flex';
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
}

// Call admin data API
document.addEventListener('DOMContentLoaded', function() {
    if (userToken) {
        fetch(`${apiSource}api/admin/all-admins`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.data && data.data.users) {
                const adminTable = document.getElementById('adminData');
                data.data.users.forEach(user => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.role}</td>
                        <td>${user.email}</td>
                        <td>
                            <button class="btn delete" data-id="${user.id}" onclick="deleteAdmin(${user.id}, '${userToken}')">Delete</button>
                            <button class="btn" onclick="changeAdminpassword('${user.email}')">Change password</button>
                        </td>
                    `;
                    adminTable.appendChild(row);
                });
            } else {
                console.error('No users found in the response data.');
            }
        })
        .catch(error => console.error('Error:', error));
    } else {
        console.error('No userToken found in sessionStorage.');
    }
});

// Add new admin
const addAdminBtn = document.getElementById('addAdminBtn');
const alertBox = document.getElementById('adminAlertBox');

addAdminBtn.addEventListener('click', function() {
    const adminName = document.getElementById('adminName').value.trim();
    const adminEmail = document.getElementById('adminEmail').value.trim();
    const adminPassword = document.getElementById('adminPassword').value.trim();

    if (adminName === '' || adminEmail === '' || adminPassword === '') {
        alertBox.style.display = 'block';
    } else {
        alertBox.style.display = 'none';
        fetch(`${apiSource}api/admin/add-admin?name=${encodeURIComponent(adminName)}&email=${encodeURIComponent(adminEmail)}&password=${encodeURIComponent(adminPassword)}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            location.reload(); 
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});

// Delete admin
function deleteAdmin(userId, userToken) {
    if (confirm('Are you sure you want to delete this admin?')) {
        fetch(`${apiSource}api/admin/delete/${userId}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Admin deleted successfully!');
                location.reload(); 
            } else {
                response.json().then(data => {
                    console.error('Failed to delete admin:', data);
                    alert('Failed to delete admin. Please try again.');
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        });
    }
}

// Change password
function changeAdminpassword(email) {
    // Show the password change view
    document.getElementById('changeView').style.display = 'flex';

    // Get user token inside the function
    const userToken = sessionStorage.getItem('userToken');

    // Add event listener for the "Done" button
    const doneChangeButton = document.getElementById('doneChange');
    doneChangeButton.removeEventListener('click', handleDoneChange); // Prevent multiple event listeners
    doneChangeButton.addEventListener('click', handleDoneChange);

    function handleDoneChange() {
        const newPassword = document.getElementById('newpassword').value;

        if (newPassword) {
            // Construct the API URL
            const apiUrl = `${apiSource}api/admin/change-password?email=${encodeURIComponent(email)}&password=${encodeURIComponent(newPassword)}`;
            
            // Send the request to the API
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log("Password changed successfully:", data);
                alert("Password changed successfully!");
                // Optionally, hide the change view again
                document.getElementById('changeView').style.display = 'none';
            })
            .catch(error => {
                console.error("Error changing password:", error);
                alert("Failed to change password. Please try again.");
            });
        } else {
            alert("Please enter a new password.");
        }
    }
}

