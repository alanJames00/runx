const childprocess = require('child_process');
const fs = require('fs');

// list all stopped containers in an aync function
function listStoppedContainers() {

    const containers = childprocess.execSync('docker ps -a').toString().split('\n');
    return containers;
}

function createContainer({ containerName }) {
    const container = childprocess.execSync(`docker create -it --name ${containerName} --pids-limit ${process.env.PID_LIMIT} ${process.env.POD_IMAGE_NAME}`).toString();
    const memRes = childprocess.execSync(`docker update --memory=200m --memory-swap=300m ${containerName}`);
    return container;
}

function putFileInContainer(containerId, file) {
    const container = childprocess.execSync(`docker cp ${file} ${containerId}:/tmp/`).toString();
    return container;
}

function startContainer(containerId) {
    const container = childprocess.execSync(`docker start ${containerId}`).toString();
    return container;
}

function execCommand(containerId, command) {
    const container = childprocess.execSync(`docker exec ${containerId} ${command}`).toString();
    return container;
}


function cleanUp(containerId) {
    
    const exitCode = childprocess.execSync(`docker inspect -f '{{.State.ExitCode}}' ${containerId}`).toString();

    const coinatiner = childprocess.execSync(`docker kill ${containerId}`).toString();
    const container2 = childprocess.execSync(`docker rm ${containerId}`).toString();
    
    return exitCode;
}

function getContainerCount() {

    const stdout = childprocess.execSync(`docker ps | wc -l`);
    return parseInt(stdout.toString())-1;
}


module.exports = {
    listStoppedContainers,
    createContainer,
    putFileInContainer,
    execCommand,
    cleanUp,
    startContainer,
    getContainerCount,
}