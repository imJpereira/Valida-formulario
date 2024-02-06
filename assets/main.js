class User {
    constructor(name, surname, cpf, user, password, repeatPassword) {
        this.name = name,
        this.surname = surname,
        this.cpf = cpf,
        this.user = user,
        this.password = password,
        this.repeatPassword = repeatPassword
    }

    validateForm() {
        let valid = !!(
            this.blank() &
            this.checkNameAndSurname() &
            this.checkCPF() &
            this.checkUser() &
            this.checkPassword()
        );

        if (valid) {
            const allSpans = document.querySelectorAll('.error-message');
            allSpans.forEach(span => span.remove());
        }

        return valid;
    }  
    
    innerErrorMessage(element, mensagem) {
        const existingSpan = element.querySelector('.error-message');
        
        if (!existingSpan) {
            const newSpan = document.createElement('span');
            newSpan.textContent = '*' + mensagem;
            newSpan.className = 'error-message';
            element.appendChild(newSpan);
        }  
    }
    
    removeErrorMessage(element) {
        const existingSpan = element.querySelector('.error-message');
        if (existingSpan) {
            existingSpan.remove();
        }
    }
    
    blank() {
        const array = [this.name, this.surname, this.cpf, this.user, this.password, this.repeatPassword];
        
        if (!this.name || !this.surname || !this.cpf || !this.user || !this.password || !this.repeatPassword) {

            for (let i = 0; i < array.length; i++) {
                const obj = array[i];
                const element = document.getElementById(`${i}-element`);
                
                if (!obj) {
                    this.innerErrorMessage(element, 'Esse campo não pode estar em branco');   
                } else {
                    this.removeErrorMessage(element);
                }
            }
            return false;
        } 
        return true;
    }
    
    checkNameAndSurname() {
        let valid = false;

        const nameContainer = document.getElementById('0-element');
        if (/[^a-zA-Z\u00C0-\u017F\s]/.test(this.name) || this.name.trim() === '') {
            this.innerErrorMessage(nameContainer, 'Nome inválido');
            valid = false;
        } else valid = true;

        const surnameContainer = document.getElementById('1-element');
        if (/[^a-zA-Z\u00C0-\u017F\s]/.test(this.surname) || this.surname.trim() === '') {
            this.innerErrorMessage(surnameContainer, 'Sobrenome inválido');
            valid = false;
        } else return true;
        
        return valid;
    }

    checkCPF() {
        const cpf = new Cpf(this.cpf);
        const cpfContainer = document.getElementById('2-element');
        
        if(!(cpf.validateCpf())) {
            this.innerErrorMessage(cpfContainer, 'CPF inválido');
            return false;
        } 
        return true;
    }

    checkUser() {
        const userContainer = document.getElementById('3-element');
        let valid = false

        if (/[^a-zA-Z0-9]/.test(this.user)) {
            this.innerErrorMessage(userContainer, 'O usuário não pode conter caracteres especiais');
            valid = false
        } else valid = true;

        if (this.user.length < 3 || this.user.length > 12) {
            this.innerErrorMessage(userContainer, 'O usuário deve ter entre 3 e 12 caracteres');
            valid = false
        } else valid = true;

        return valid;
    }

    checkPassword() {
        const passwordContainer = document.getElementById('4-element');
        const repeatPasswordContainer = document.getElementById('5-element');
        let valid = false;
        
        if (this.password.length < 6 || this.password.length > 12) {
            this.innerErrorMessage(passwordContainer, 'A senha deve ter entre 6 e 12 caracteres');
            valid = false;
        } else valid = true;

        if (this.password !== this.repeatPassword) {
            this.innerErrorMessage(repeatPasswordContainer, 'As senhas não condizem');
            valid = false;
        } else valid = true;

        return valid;
    }
}

const sendButton = document.getElementById("send-button");
const showHideButton = document.querySelectorAll('.show-hide');

const nameInput = document.getElementById("name");
const surname = document.getElementById("surname");
const cpf = document.getElementById("cpf");
const user = document.getElementById("user");
const password = document.getElementById("password");
const repeatPassword = document.getElementById("repeat-password");

showPassword = () => {
    if (password.type === 'password') {
        password.setAttribute('type', 'text');
        repeatPassword.setAttribute('type', 'text');
        showHideButton.forEach(button => {
            button.classList.replace('bi-eye-slash', 'bi-eye');
        })
    }  else {
        password.setAttribute('type', 'password');
        repeatPassword.setAttribute('type', 'password');
        showHideButton.forEach(button => {
            button.classList.replace('bi-eye', 'bi-eye-slash');
        })
    }
}

sendButton.addEventListener('click', () => {
    const user1 = new User(nameInput.value, surname.value, cpf.value, user.value, password.value, repeatPassword.value);
    const itsValid = user1.validateForm();
    const inputs = document.querySelectorAll('.input')
    
    if (itsValid) {
        console.log('válido');

        const instructionsDiv = document.getElementById('instructions');
        instructionsDiv.remove();
        sendButton.remove();

        const infoContainer = document.getElementById('info-container');

        const validMessage = document.createElement('div');
        validMessage.classList.add('valid-message');

        const newH1 = document.createElement('h1');  
        newH1.textContent = 'Formulário enviado com sucesso.'

        inputs.forEach(input => {
            input.readOnly = true;
            input.style.border = 'none';
        })
        infoContainer.appendChild(validMessage);
        validMessage.appendChild(newH1);
    }
});