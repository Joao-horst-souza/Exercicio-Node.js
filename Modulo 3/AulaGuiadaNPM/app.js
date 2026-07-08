import chalk from 'chalk';
import sillyname from 'sillyname';
import prompt from 'prompt-sync';


console.log(chalk.green("Mensagem colorida"));
console.log(chalk.red("Erro!"));

console.log(chalk.bgYellowBright("Depressão e trevas"));

const nomeGerado = sillyname();

console.log("Nome gerado:", nomeGerado);
console.log(chalk.blue(sillyname()));

const promptFn = prompt();
const nome = promptFn('Qual é o seu nome?' );
console.log('Olá,',nome)