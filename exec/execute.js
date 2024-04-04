const docker = require('./docker');
const fs = require('fs');
const uuid = require('uuid');

// execute the code
async function executeCode({codeString, runtime}) {

    try {

        // generate uuid
        const fid = uuid.v4().substring(6,15);
            
        // switch case to form the filename
        let filename = "sample-" + fid + "."
        switch(runtime) {
            case 'js':
                filename = filename+"js";
                break;
            case "cpp":
                filename = filename+"cpp";
                break;
            case 'py':
                filename = filename+"py"
                break;
        }
        console.log(codeString);
        // create  the file
        fs.writeFileSync(`./exec/tmp/${filename}`, codeString, 'utf-8'); 
        
    }
    catch(e) {
        console.log(e);
    }
}

module.exports = {
    executeCode,
}