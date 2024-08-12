import inquirer from "inquirer";
import chalk from "chalk";

inquirer.prompt([
    {name: "nome", message: "Qual é o seu nome?"},
    {name: "idade", message: "Qual é a sua idade?"},
]).then((resposta) => {
    const final = `O nome do usuário é ${resposta.nome} e ele tem ${resposta.idade} anos`
    console.log(chalk.bgYellow.black(final))
}).catch((error) => console.log(error))