const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const passwordToggle = document.getElementById('passwordToggle');
const loginButton = document.querySelector('.login-button');
const buttonLoader = document.getElementById('buttonLoader');
const buttonText = document.querySelector('.button-text');

passwordToggle.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    const icon = this.querySelector('i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
});

emailInput.addEventListener('input', function() {
    validateEmail(this);
});

passwordInput.addEventListener('input', function() {
    validatePassword(this);
});

function validateEmail(input) {
    const email = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errorElement = document.getElementById('emailError');
    
    if (email === '') {
        clearValidation(input, errorElement);
    } else if (!emailRegex.test(email)) {
        showError(input, errorElement, 'Por favor, insira um e-mail válido');
    } else {
        showSuccess(input, errorElement);
    }
}

function validatePassword(input) {
    const password = input.value;
    const errorElement = document.getElementById('passwordError');
    
    if (password === '') {
        clearValidation(input, errorElement);
    } else if (password.length < 6) {
        showError(input, errorElement, 'A senha deve ter pelo menos 6 caracteres');
    } else {
        showSuccess(input, errorElement);
    }
}

function showError(input, errorElement, message) {
    input.classList.remove('success');
    input.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function showSuccess(input, errorElement) {
    input.classList.remove('error');
    input.classList.add('success');
    errorElement.classList.remove('show');
}

function clearValidation(input, errorElement) {
    input.classList.remove('error', 'success');
    errorElement.classList.remove('show');
}

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    validateEmail(emailInput);
    validatePassword(passwordInput);
    
    const hasErrors = document.querySelectorAll('.form-input.error').length > 0;
    const isEmpty = !emailInput.value.trim() || !passwordInput.value.trim();
    
    if (hasErrors || isEmpty) {
        if (isEmpty) {
            if (!emailInput.value.trim()) {
                showError(emailInput, document.getElementById('emailError'), 'E-mail é obrigatório');
            }
            if (!passwordInput.value.trim()) {
                showError(passwordInput, document.getElementById('passwordError'), 'Senha é obrigatória');
            }
        }
        return;
    }
    
    performLogin();
});

function performLogin() {
    loginButton.classList.add('loading');
    loginButton.disabled = true;
    
    setTimeout(() => {
        showSuccessMessage();
        
        setTimeout(() => {
            redirectToDashboard();
        }, 1500);
        
    }, 2000);
}

function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>Login realizado com sucesso!</span>
    `;
    
    successMessage.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #27AE60 0%, #2ECC71 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(39, 174, 96, 0.3);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-weight: 500;
        z-index: 1000;
        animation: slideInRight 0.5s ease-out;
    `;
    
    document.body.appendChild(successMessage);
    
    
    setTimeout(() => {
        successMessage.remove();
    }, 3000);
}

function redirectToDashboard() {
    const userData = {
        email: emailInput.value,
        loginTime: new Date().toISOString()
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    
    const transitionOverlay = document.createElement('div');
    transitionOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1B365D 0%, #2E5984 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: white;
        animation: fadeIn 0.5s ease-out;
    `;
    
   transitionOverlay.innerHTML = `
    <div style="text-align: center;">
        <div style="
            width: 50px;
            height: 50px;
            border: 4px solid rgba(212, 175, 55, 0.3);
            border-top: 4px solid #D4AF37;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1.5rem auto; /* CENTRALIZA O CÍRCULO */
        "></div>

        <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem;">
            Carregando Dashboard
        </h2>

        <p style="opacity: 0.8;">Preparando seu ambiente de trabalho...</p>
    </div>
`;

    
    document.body.appendChild(transitionOverlay);
    
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 2500);
}

const animations = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes floatParticle {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.1;
        }
        50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.3;
        }
    }
`;

const style = document.createElement('style');
style.textContent = animations;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', function() {
    const formElements = document.querySelectorAll('.form-group');
    formElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.5s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 * (index + 1));
    });
});

function createParticles() {
    const creativePanel = document.querySelector('.creative-panel');
    if (!creativePanel) return;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            animation: floatParticle ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
        `;
        
        creativePanel.appendChild(particle);
    }
}

createParticles();