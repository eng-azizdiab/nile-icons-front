// Admin logout 
function logout() {
    sessionStorage.removeItem('userToken');
    window.location.href = 'index.html';
}
