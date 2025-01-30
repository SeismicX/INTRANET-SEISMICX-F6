document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('users.json')
        .then(response => response.json())
        .then(users => {
            const user = users.find(u => u.username === username && u.password === password);
            if (user) {
                window.location.href = 'dashboard.html'; // Redirige al dashboard
            } else {
                document.getElementById('error-message').textContent = 'Usuario o contraseña incorrectos';
            }
        })
        .catch(error => console.error('Error:', error));
});