class User {
    constructor(nome, sobrenome, cpf, usuario) {
        this.nome = nome,
        this.sobrenome = sobrenome,
        this.cpf = cpf,
        this.usuario = usuario
    }

    validaFormulario() {
        if (this.campoEmBranco()) {
            alert('Os campos não podem estar em branco');
            return;            
        }

        if(this.verificaCaracteresEspeciais()) {
            alert('O usuário não pode conter caracteres especiais')
            return;
        }



    }

    campoEmBranco() {
        return !(this.nome && this.sobrenome && this.cpf && this.usuario)
    }

    verificaCaracteresEspeciais() {
        return /[^a-zA-Z0-9]/.test(this.usuario);
    }


}



const sendButton = document.getElementById("send-button");


sendButton.addEventListener('click', () => {
    const nome = document.getElementById("nome").value;
    const sobrenome = document.getElementById("sobrenome").value;
    const cpf = document.getElementById("cpf").value;
    const usuario = document.getElementById("usuario").value;

    const user1 = new User(nome, sobrenome, cpf, usuario);

    user1.validaFormulario();

})

// se (algum dos campos for igual a "") return invalido;