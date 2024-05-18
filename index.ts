#!/urs/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";

const apiLink ="https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple"


let fetchData = async(data:string) =>{
    let fetchQuize:any = await fetch(data)
    let res = await fetchQuize.json()
    return res.results;
}

let data = await fetchData(apiLink);

let startQuiz = async() => {
    let score:number = 0
    //for user name//
    let name = await inquirer.prompt({
        type:"input",
        name:"qname",
        message:"What Is Your Name?",
        validate:function(value){
            if (value.trim() !==""){
                return true;
            }
            return "Please enter a non-empty value"
        }
    })

    for(let i = 1; i < 10 ; i++ ){
        let answers = [...data[i].incorrect_answers, data[i].correct_answer];

        let ans = await inquirer.prompt({
            type:"list",
            name:"quiz",
            message:data[i].question,
            choices:answers.map((val:any)=>val),
        });

        if(ans.quiz == data[i]. correct_answer){
            ++score
            console.log(chalk.bold.italic.blue("CORRECT!!!!"))
        }else{
            console.log(`Correct Answer Is ${chalk.bold.italic.redBright(data[i]. correct_answer)}`);
        }
    }

    console.log(`Dear ${chalk.green.bold(name.qname)}, Your Score is ${chalk.red.bold(score)} Out Of ${chalk.red.bold("10")}`);
};

startQuiz();







