document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const submitButton = document.getElementById('submitButton');
    submitButton.classList.add('loading'); // Add loading state to button

    // Gather form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('myTextarea').value;

    // Prepare API request payload as JSON
    const payload = {
        email: email,
        phone: phone,
        name: name,
        notes: message
    };

    // Send data to the API
    fetch("https://back.nileicons.com/api/public/contact-us", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);

        // Show the confirmation box
        document.getElementById('confirmationBox').style.display = 'block';

        // Clear form fields after successful submission
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('myTextarea').value = '';
    })
    .catch(error => {
        console.error('Error occurred while sending message:', error);
    })
    .finally(() => {
        // Remove loading state from button
        submitButton.classList.remove('loading');
    });
});
