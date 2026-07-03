const listaDeUsuarios = [];

function criarUsuario(nome, idade){
    if (typeof nome !== 'string' || typeof idade !== 'number' || idade <= 0){
        return {sucesso: false, mensagem:"Nome inválido e/ou idade inválidos"}
    } else {
    
    const novoUsuario = {
        id: listaDeUsuarios.length + 1,
        nome: nome,
        idade: idade
    };
    
    listaDeUsuarios.push(novoUsuario);
        return { sucesso: true, mensagem: "Usuário criado com sucesso!"}
    };
}   

    function listarUsuarios() {
        return listaDeUsuarios;
    }

module.exports = {
    criarUsuario,
    listaDeUsuarios
}