const docker = require('./docker');
const fs = require('fs');
const uuid = require('uuid');
const counter = require('../api/counter');
// execute the code
async function executeCode({ codeString, runtime }) {

    try {

        // generate uuid
        const fid = uuid.v4().substring(6, 15);

        // switch case to form the filename
        let filename = "sample-" + fid + "."
        switch (runtime) {
            case 'js':
                filename = filename + "js";
                break;
            case "cpp":
                filename = filename + "cpp";
                break;
            case 'py3':
                filename = filename + "py"
                break;
            case 'c':
                filename = filename + "c";
                break;

            default:
                return 'Invalid value for runtime'
        }
        console.log(codeString);
        // create  the file
        fs.writeFileSync(`./exec/tmp/${filename}`, codeString, 'utf-8');


        // create a container
        const containerName = "runx-pod-" + counter.getContainerCount().toString();
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

        // spawn a child process to exec the container with error handling
        const execRes = await new Promise((resolve, reject) => {
            const child = require('child_process').spawn('docker', ['exec', containerName, 'bash', 'run.sh', runtime, `/tmp/${filename}`]);
            let output = "";
            let error = "";
            child.stdout.on('data', (data) => {
                output += data;
            });
            child.stderr.on('data', (data) => {
                error += data;
            });
            child.on('exit', (code) => {
                    // console.log(error);
                    console.log('test-code::', code);
                    resolve({
                        stderr: error,
                        stdout: output,
                        exitCode: code,
                    });
            });
        });

        // cleanup containers
        const cleanUpRes = docker.cleanUp(containerName);
        console.log(cleanUpRes);


        // decrement the counter
        counter.decrementContainerCount();

        // // remove the file
        await fs.rmSync(`./exec/tmp/${filename}`);

        return execRes;
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = {
    executeCode,
}