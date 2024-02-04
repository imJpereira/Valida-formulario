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
        this.blank();
        this.checkNameAndSurname();
        this.checkCPF();
        this.checkUser();
        this.checkPassword();

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
        
        for (let i = 0; i < array.length; i++) {
            const obj = array[i];
            const element = document.getElementById(`${i}-element`);
            
            if (obj === '') {
                this.innerErrorMessage(element, 'Esse campo não pode estar em branco');   
            } else {
                this.removeErrorMessage(element);
            }
        }
    }
    
    checkNameAndSurname() {
        const nameContainer = document.getElementById('0-element');
        if (/[^a-zA-Z\u00C0-\u017F\s]/.test(this.name) || this.name.trim() === '') {
            this.innerErrorMessage(nameContainer, 'Nome inválido');
        } 

        const surnameContainer = document.getElementById('1-element');
        if (/[^a-zA-Z\u00C0-\u017F\s]/.test(this.surname) || this.surname.trim() === '') {
            this.innerErrorMessage(surnameContainer, 'Sobrenome inválido');
        }
    }

    checkCPF() {
        const cpf = new Cpf(this.cpf);
        const cpfContainer = document.getElementById('2-element');
        
        if(!(cpf.validateCpf())) {
            this.innerErrorMessage(cpfContainer, 'CPF inválido');
        } 
    }


    checkUser() {
        const userContainer = document.getElementById('3-element');

        if (/[^a-zA-Z0-9]/.test(this.user)) {
            this.innerErrorMessage(userContainer, 'O usuário não pode conter caracteres especiais');
        } 

        if (this.user.length < 3 || this.user.length > 12) {
            this.innerErrorMessage(userContainer, 'O usuário deve ter entre 3 e 12 caracteres');
        } 
    }

    checkPassword() {
        const passwordContainer = document.getElementById('4-element');
        const repeatPasswordContainer = document.getElementById('5-element');
        
        if (this.password.length < 6 || this.password.length > 12) {
            this.innerErrorMessage(passwordContainer, 'A senha deve ter entre 6 e 12 caracteres');
        }

        if (this.password !== this.repeatPassword) {
            this.innerErrorMessage(repeatPasswordContainer, 'As senhas não condizem');
        }

        return;
    }

    
}

class Cpf extends User{
    constructor(cpf) {
        super(cpf)
        Object.defineProperty(this, "cleanCPF", {
            value: cpf.replace(/\D+/g, ''),
            enumerable: false,
            writable: false,
            configurable: false
        })
    }

    validateCpf() {

        if (this.cleanCPF.length !== 11) return false;
        if (typeof this.cleanCPF !== "string") return false;
        if (this.isSequential()) return false;
        
        this.createBaseArray();
        this.calculation();
        
        return this.cleanCPF === this.baseArray.join('');
    }

    isSequential() {
        const sequence = this.cleanCPF[0].repeat(11);
        return sequence === this.cleanCPF;
    }

    createBaseArray() {
        this.baseArray = this.cleanCPF.split('');
        this.baseArray.splice(-2);
    }

    calculation() {
        for(let i = 11; i <= 12; i++) this.calculateDigit(i);
    }

    calculateDigit(i) {
        const multiplied = this.multiply(i);
        const added = this.sum(multiplied);
        const digit = this.getDigit(added);
        this.baseArray.push(String(digit));
    }

    multiply(i) {
        return this.baseArray.map(digit => {
            i--
            return i * Number(digit);
        })
    }

    sum = multipliedArray => multipliedArray.reduce((ac, digit) => ac += digit, 0)

    getDigit(number) {
        const final = 11 - (number % 11);
        return final >= 10 ? 0 : final;
    }   
}


const sendButton = document.getElementById("send-button");

sendButton.addEventListener('click', () => {
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const cpf = document.getElementById("cpf").value;
    const user = document.getElementById("user").value;
    const password = document.getElementById("password").value;
    const repeatPassword = document.getElementById("repeat-password").value;
    
    const user1 = new User(name, surname, cpf, user, password, repeatPassword);
    user1.validateForm();

})

