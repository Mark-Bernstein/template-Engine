const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const inquirer = require("inquirer");
const fs = require("fs");

const initialQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the manager's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What the manager's employee id?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the manager's email?"
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is the manager's office number?"
    },
    {
        type: "list",
        name: "member",
        message: "Which team member would you like to add?",
        choices: ["Intern", "Engineer"]
    }
];

const engineerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the employee's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the employee's id?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the employee's email?"
    },
    {
        type: "input",
        name: "github",
        message: "What is the employee's GitHub username?"
    }
];

const internQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the intern's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the intern's id?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the intern's email?"
    },
    {
        type: "input",
        name: "school",
        message: "What school is the intern attending?"
    }
];

const moreMembersQuestion = [
    {
        type: "list",
        name: "additionalMember",
        message: "Would you like to add another team member? If so, which kind?",
        choices: ["Intern", "Engineer", "No more members."]
    }
];

inquirer
    .prompt(initialQuestions)
    .then(function (user) {
        const templateMainFile = fs.readFileSync(`./templates/main.html`, { encoding: 'utf8' });
        const manager = new Manager(user.name, user.id, user.email, user.officeNumber);

        let team = renderHTML(manager);
        buildTeam(user.member, team, templateMainFile);
    }).catch(err => console.log(err));

async function buildTeam(chosenMember, team, templateMainFile) {
<<<<<<< HEAD
    console.log("inside buildTeam function");
    switch (chosenMember) {
        case "Engineer":
            console.log("im inside switch(chosenMember) and case is engineer");
            const engineer = await inquirer.prompt(engineerQuestions);
            let engineer1 = new Engineer(engineer.name, engineer.id, engineer.email, engineer.github);
            let engineer1Card = renderHTML(engineer1);
            team = team + engineer1Card;

            console.log("HERE I AM, line 119");
            let addMember = await inquirer.prompt(moreMembersQuestion);
            console.log("line 121 executed");
            chosenMember = addMember.additionalMember;
            console.log(chosenMember, "is the addMember.additionalMember");


            if (addMember.choice === "Engineer") {
                let newMember = await inquirer.prompt(engineerQuestions);
                chosenMember = newMember.additionalMember;
                console.log("about to call buildTeam function for engineer");
                buildTeam(chosenMember, team, templateMainFile);

            } else if (addMember.choice === "Intern") {
                await inquirer.prompt(internQuestions);
                console.log("about to call buildTeam function for intern");
                buildTeam(chosenMember, team, templateMainFile);
            } else {
=======
    try {
        switch (chosenMember) {
            case "Engineer":
                const engineer = await inquirer.prompt(engineerQuestions);
                let engineer1 = new Engineer(engineer.name, engineer.id, engineer.email, engineer.github);
                let engineer1Card = renderHTML(engineer1);
                team = team + engineer1Card;
                let addMember = await inquirer.prompt(moreMembersQuestion);
                chosenMember = addMember.additionalMember;

                if (chosenMember === "Engineer") {
                    buildTeam(chosenMember, team, templateMainFile);
                } else if (chosenMember === "Intern") {
                    buildTeam(chosenMember, team, templateMainFile);
                } else {
                    let temporaryMainFile = templateMainFile.replace('{{ team }}', team);
                    fs.writeFileSync("./output/index.html", temporaryMainFile);
                }
                break;

            case "Intern":
                const intern = await inquirer.prompt(internQuestions);
                let intern1 = new Intern(intern.name, intern.id, intern.email, intern.school);
                let intern1Card = renderHTML(intern1);
                team = team + intern1Card;

                let addMember2 = await inquirer.prompt(moreMembersQuestion);
                chosenMember2 = addMember2.additionalMember;

                if (chosenMember2 === "Engineer") {
                    buildTeam(chosenMember2, team, templateMainFile);
                } else if (chosenMember2 === "Intern") {
                    buildTeam(chosenMember2, team, templateMainFile);
                } else {
                    let temporaryMainFile = templateMainFile.replace('{{ team }}', team);
                    fs.writeFileSync("./output/index.html", temporaryMainFile);
                }
                break;
            case "No more members.":
>>>>>>> 35f48f867940b1e27e58343a974d80f97e6db889
                let temporaryMainFile = templateMainFile.replace('{{ team }}', team);
                fs.writeFileSync("./output/index.html", temporaryMainFile);
        }
    } catch (err) {
        console.log(err);
    }
}

function renderHTML(position) {
    const templateFile = fs.readFileSync(`./templates/${position.getRole().toLowerCase()}.html`, { encoding: 'utf8' });
    let temporaryFile = templateFile.replace('{{ name }}', position.name);
    temporaryFile = temporaryFile.replace('{{ role }}', position.getRole());
    temporaryFile = temporaryFile.replace('{{ id }}', position.id);
    temporaryFile = temporaryFile.replace('{{ email }}', position.email);
    temporaryFile = temporaryFile.replace('{{ email }}', position.email);

    if (position.getRole().toLowerCase() === "engineer") {
        temporaryFile = temporaryFile.replace('{{ github }}', position.github);
        temporaryFile = temporaryFile.replace('{{ github }}', position.github);
    } else if (position.getRole().toLowerCase() === "intern") {
        temporaryFile = temporaryFile.replace('{{ school }}', position.school);
    } else if (position.getRole().toLowerCase() === "manager") {
        temporaryFile = temporaryFile.replace('{{ officeNumber }}', position.officeNumber);
    }
    return temporaryFile;
}
