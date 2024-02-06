class Cpf {
    constructor(cpf) {
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