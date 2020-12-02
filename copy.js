const fs = require('fs');

function getNestedDirs(dirs) {
    if (!Array.isArray(dirs)) dirs = [dirs];
    
    let subDirs = [];
    dirs.forEach((dir) => {
        const list = fs.readdirSync(dir).map((x) => `${dir}/${x}`);
        const currentSubDirs = list.filter((x) => fs.statSync(x).isDirectory());
        
        subDirs = [ ...subDirs, ...currentSubDirs, ...getNestedDirs(currentSubDirs) ];
    });

    return subDirs;
}

function getFiles(dirs) {
    if (!Array.isArray(dirs)) dirs = [dirs];

    let files = [];
    dirs.forEach((dir) => {
        const list = fs.readdirSync(dir).map((x) => `${dir}/${x}`);
        const currentFiles = list.filter((x) => fs.statSync(x).isFile());

        files = [ ...files, ...currentFiles ];
    })

    return files;
}

const copyFile = (fromPath, toPath) => fs.createReadStream(fromPath).pipe(fs.createWriteStream(toPath));

exports.copyFiles = function (fromDir, toDir) {
    const allDirs = getNestedDirs(fromDir);
    const allFiles = getFiles([ ...allDirs, fromDir]);
    
    allDirs.forEach((dir) => fs.mkdirSync(dir.replace(fromDir, toDir)));
    allFiles.forEach((file) => copyFile(file, file.replace(fromDir, toDir)));
}
