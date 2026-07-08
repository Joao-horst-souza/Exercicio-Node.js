import chalk from 'chalk';
import sillyName from 'sillyname';

console.log("Projeto NPM Funcionando!");

console.log(chalk.green("Uma Mensagem Verde!"));
console.log(chalk.red("Uma Mensagem Vermelha!"));
console.log(chalk.blue("Uma Mensagem Azul!"));

const nomeGerado = sillyName();

console.log("Nome Gerado:", nomeGerado);
console.log(chalk.bgWhiteBright(sillyName()));
console.log(chalk.bgWhiteBright(sillyName()));
console.log(chalk.bgWhiteBright(sillyName()));