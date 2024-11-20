const apiSource = `https://back.nileicons.com/`;

document.addEventListener('DOMContentLoaded', function() {
    const userToken = sessionStorage.getItem('userToken');

    if (userToken) {
        fetch(`${apiSource}api/admin/messages`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === "Success") {
                const messagesTable = document.getElementById('messagesTable');
                
                data.data.forEach(message => {
                    
                    let className = '';
                    if (message.seen === 1) { 
                        className = "seen";
                    }

                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td class="${className}">${message.id}</td>
                        <td>${message.name}</td>
                        <td>${message.email}</td>
                        <td>${message.phone}</td>
                        <td class="note">${message.notes}</td>
                        <td><button id="seen-btn-${message.id}" class="btn" onclick="seen(${message.id})">Seen</button></td>
                    `;
                    messagesTable.appendChild(row);
                });
            } else {
                console.error('Failed to load messages:', data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    } else {
        console.error('No userToken found in sessionStorage.');
    }
});

// seen msg 
async function seen(messageId) {
    try {
        const response = await fetch(`${apiSource}api/admin/messages/${messageId}`, {
            method: 'GET', 
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`,
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message || 'Message marked as seen.');
            location.reload()
        } else {
            alert('Failed to mark the message as seen: ' + result.message);
        }
    } catch (error) {
        console.error('Error marking message as seen:', error);
        alert('An error occurred while marking the message as seen.');
    }
}
