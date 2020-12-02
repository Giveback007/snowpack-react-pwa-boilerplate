const readline = require('readline');

exports.question = (qText) => new Promise((res) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    rl.question(qText, (answer) => {
        rl.close();
        res(answer);
    })
});

exports.testName = (input) => /^[a-z0-9_-]+$/.test(input);

exports.toCapName = (str) => str.replace(/[\-_]/g, " ").split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');

exports.askProjectName = async function() {
    const name = await exports.question('# Valid folder name, lowercase, and no spaces:\n');

    if (!exports.testName(name)) {
        console.log(`# Invalid name: "${name}"\n# Eg: "project-name" or "project_name"\n`);
        return await exports.askProjectName();
    } else return name
}
