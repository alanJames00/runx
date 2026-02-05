import dockerClient from "./dockerClient"
import fs from "fs"
import { randomUUID } from "node:crypto"
import child_process from "child_process"

type TExecuteCodeParams = {
    codeString: string;
    runtime: string;
    stdinData: string | null;
}

export async function executeCode(
    { codeString, runtime, stdinData }: TExecuteCodeParams
) {

    // generate uuid
    const fid = randomUUID().substring(6, 15);

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

    const tempFilePath = `./temp/${filename}`

    try {
        // create  the file
        fs.writeFileSync(tempFilePath, codeString, 'utf-8');

        // create a container
        const containerName = "runx-pod-" + dockerClient.getContainerCount().toString();
        const createRes = await dockerClient.createContainer({ containerName: containerName });


        // copy the file to container
        const putFileRes = await dockerClient.putFileInContainer(containerName, tempFilePath)

        // start the container
        const startRes = await dockerClient.startContainer(containerName);


        // spawn a child process to exec the container with error handling
        const execRes = await new Promise((resolve, reject) => {
            const child = child_process.spawn('docker', ['exec', containerName, 'bash', 'run.sh', runtime, `/tmp/${filename}`, stdinData ?? '']);
            let output = "";
            let error = "";

            child.stdout.on('data', (data) => {
                output += data;
            });
            child.stderr.on('data', (data) => {
                error += data;
            });
            child.on('exit', (code) => {
                resolve({
                    stderr: error,
                    stdout: output,
                    exitCode: code,
                });
            });
        });

        // // cleanup containers
        const cleanUpRes = dockerClient.cleanUp(containerName);

        // // remove the file
        await fs.rmSync(tempFilePath);

        return execRes;
    }
    catch (e) {
        throw e;
    }
}
