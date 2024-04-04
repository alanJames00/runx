const docker = require('./docker');
const fs = require('fs');
const uuid = require('uuid');
const counter = require('../api/counter');

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
        
        
        // create a container
        const containerName = "runx-pod-"+counter.getContainerCount().toString();
        const createRes = await docker.createContainer({ containerName: containerName });
        console.log(createRes); 
        
        // increment the counter
        counter.incrementContainerCount();

        // copy the file to container
        const putFileRes = await docker.putFileInContainer(containerName, `./exec/tmp/${filename}`)
        console.log(putFileRes);

        // start the container
        const startRes = await docker.startContainer(containerName);
        console.log(startRes);

        // exec the container to echo the file
        const execRes = await docker.execCommand(containerName, `cat /tmp/${filename}`);
        console.log(execRes);

        // cleanup containers
        const cleanUpRes = await docker.cleanUp(containerName);
        console.log(cleanUpRes);
        
        // remove the file
        await fs.rmSync(`./exec/tmp/${filename}`);

        return execRes;
    }
    catch(e) {
        console.log(e);
    }
}

module.exports = {
    executeCode,
}