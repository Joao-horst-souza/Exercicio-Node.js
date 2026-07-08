function validarNome(nome){
    if(nome.length > 3){
        return "nome válido";
    } else {
        return "nome inválido, caracteres insuficientes";
    }
    
}

function validarIdade(idade){
    if(idade > 0){
        return "idade válida";
    } else if (idade < 0){
        return "idade inválidade, ENVELHEÇA!!!";
    }
}

module.exports = {
    validarNome,
    validarIdade
};

