const validos = (require("./utils/validacoes"));
const oper = (require("./utils/operacoes"));

console.log(validos.validarInteiros(6,7));
console.log(oper.somar(6,7));
console.log(oper.subtrair(6,7));
console.log(oper.multiplicar(6,7));
console.log(oper.dividir(6,7)); 