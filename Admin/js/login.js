const apiSource = `https://back.nileicons.com/`;


// Admin login
document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Show the loading indicator
    document.getElementById('loading').style.display = 'block';
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const data = {
        email: username,
        password: password
    };

    try {
        const response = await fetch(`${apiSource}api/admin/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            console.log("user token " + result.data.token);
            console.log('userRole' + result.data.user.role);
            sessionStorage.setItem('userRole', result.data.user.role); // Save role in session storage
            sessionStorage.setItem('userName', result.data.user.name); // Save name in session storage
            sessionStorage.setItem('userToken', result.data.token); // Save token in session storage
            window.location.href = 'home.html';
        } else {
            alert('Login failed');
        }
    } catch (error) {
        alert('Login failed'); 
    } finally {
        // Hide the loading indicator after the login process is complete
        document.getElementById('loading').style.display = 'none';
    }
});