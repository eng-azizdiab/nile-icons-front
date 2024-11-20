const apiSource = `https://niledigits.com/`

document.addEventListener('DOMContentLoaded', function() {
    const userToken = sessionStorage.getItem('userToken');
    if (userToken) {
        fetch(`${apiSource}api/admin/get-counts`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            document.getElementById('articlesCount').innerHTML = data.data.articles_count 
            document.getElementById('messagesCount').innerHTML = data.data.messages_count
            document.getElementById('adminsCount').innerHTML = data.data.users_count
            document.getElementById('visitorsCount').innerHTML = data.data.visitors_count
            document.getElementById('catCount').innerHTML = data.data.categories_count
            document.getElementById('visitorsCount').innerHTML = data.data.visitors_count

            
        })
        .catch(error => console.error('Error:', error));
    } else {
        console.error('No userToken found in sessionStorage.');
    }
});

document.getElementById('adminRole').innerHTML = sessionStorage.getItem("userRole");
document.getElementById('adminName').innerHTML = sessionStorage.getItem("userName");
