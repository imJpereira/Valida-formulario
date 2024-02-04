class User {
    constructor(name, postname, cpf, user, password, repeatPassword) {
        this.name = name,
        this.postname = postname,
        this.cpf = cpf,
        this.user = user,
        this.password = password,
        this.repeatPassword = repeatPassword
    }

    validateForm() {
        this.blank();
        this.checkCPF();
        this.checkUser();
        this.checkPassword();

    }

    blank() {
        //fazer um for no objeto

        if(!(this.name && this.postname && this.cpf && this.user)) {
            console.log('Os campos não podem estar em branco');
            return; 
        }
    }

    checkCPF() {
        const cpf = new Cpf(this.cpf);
        
        if(!(cpf.validateCpf())) {
            console.log('CPF inválido');
        } 
    }


    checkUser() {
        if (/[^a-zA-Z0-9]/.test(this.user)) {
            console.log('O usuário não pode conter caracteres especiais')
        }
        if (this.user.length < 3 || this.user.length > 12) {
            console.log('O usuário deve ter entre 3 e 12 caracteres');
        }
        return;
    }

    checkPassword() {
        if (this.password.length < 6 || this.password.length > 12) {
            console.log('A senha deve ter entre 6 e 12 caracteres');
        }

        if (this.password !== this.repeatPassword) {
            console.log('As senhas não condizem')
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
    const postname = document.getElementById("postname").value;
    const cpf = document.getElementById("cpf").value;
    const user = document.getElementById("user").value;
    const password = document.getElementById("password").value;
    const repeatPassword = document.getElementById("repeat-password").value;

    const user1 = new User(name, postname, cpf, user, password, repeatPassword);
    user1.validateForm();

})

