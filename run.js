const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');

const appUtil = require('./app-util');
const copyFiles = require('./copy').copyFiles;

// RUN:
! async function() {
    const projectName = await appUtil.askProjectName();
    fs.mkdirSync(`../${projectName}`);

    const data = JSON.parse(fs.readFileSync(`./data.json`, { encoding: 'utf-8' }));
    data.name = projectName;

    const readme = 
    `# ${appUtil.toCapName(projectName)}`
    + '\n\n<!-- The project can be viewed here: -->'
    + '\n\n<!-- [View The Page](fix-me) -->'
    + '\n\n### TODO:'
    + '\n<!-- * Replace public/index.html title: "MY-PROJECT" -->'
    + '\n<!-- * Replace public/manifest.webmanifest "short_name", "name", & "description" -->'
    + '\n<!-- * Do something -->'

    const git = 'git init && git add -A && git commit -m "Initial commit"'

    console.log('\n### Creating Files ###');
    console.log('...');
    fs.appendFileSync(`../${projectName}/package.json`, JSON.stringify(data)),
    fs.appendFileSync(`../${projectName}/README.md`, readme),
    fs.appendFileSync(`./install.bat`, `cd ../${projectName} && code . && npm install && exit`),
    copyFiles('./copy-files', `../${projectName}`);
    console.log('...Done');
    
    console.log('\n### Installing NPM Packages ###');
    console.log('...');
    await exec(`start install.bat`);
    fs.unlinkSync(`./install.bat`);
    console.log('...Done');

    console.log('\n### Making First Git Commit ###');
    console.log('...');
    await exec(`cd ../${projectName} && ${git} && exit`);
    console.log('...Done');

    console.log(`\n### Project "${appUtil.toCapName(projectName)}" Created ###`);
    console.log('...Window Closing');
    await new Promise((r) => setTimeout(() => r(), 3500));
    process.exit(0);
}();
