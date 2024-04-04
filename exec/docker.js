const childprocess = require('child_process');
const fs = require('fs');

// list all stopped containers in an aync function
async function listStoppedContainers() {

    const containers = childprocess.execSync('docker ps -a').toString().split('\n');
    return containers;
}

async function createContainer({ containerName }) {
    const container = childprocess.execSync(`docker create -it --name ${containerName} alpine:latest`).toString();
    return container;
}

async function putFileInContainer(containerId, file) {
    const container = childprocess.execSync(`docker cp ${file} ${containerId}:/tmp`).toString();
    return container;
}

async function startContainer(containerId) {
    const container = childprocess.execSync(`docker start ${containerId}`).toString();
    return container;
}

async function execCommand(containerId, command) {
    const container = childprocess.execSync(`docker exec ${containerId} ${command}`).toString();
    return container;
}

async function cleanUp(containerId) {
    const coinatiner = childprocess.execSync(`docker kill ${containerId}`).toString();
    const container2 = childprocess.execSync(`docker rm ${containerId}`).toString();
    return container2;
}



module.exports = {
    listStoppedContainers,
    createContainer,
    putFileInContainer,
    execCommand,
    cleanUp,
    startContainer,
}