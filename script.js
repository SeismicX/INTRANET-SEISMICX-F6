document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Validación rápida antes de enviar
    if (!username || !password) {
        errorMessage.textContent = 'Completa ambos campos.';
        return;
    }

    // Mostrar mensaje de carga (puedes añadir un spinner también si deseas)
    errorMessage.textContent = 'Verificando...';

    fetch('users.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo cargar la base de usuarios.');
            }
            return response.json();
        })
        .then(users => {
            const user = users.find(u => u.username === username && u.password === password);
            if (user) {
                errorMessage.textContent = '';
                window.location.href = 'dashboard.html';
            } else {
                errorMessage.textContent = 'Usuario o contraseña incorrectos.';
                passwordInput.value = '';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            errorMessage.textContent = 'Ocurrió un error. Intenta nuevamente.';
        });
});