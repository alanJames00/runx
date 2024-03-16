const Docker = require('dockerode');

const docker = new Docker({socketPath: '/var/run/docker.sock'}); // default config

// list all containers

async function listContainers() {

  try {
    
    const containers = await docker.listContainers();
    console.log(containers);
  }
  catch(e) {
    console.log(e);
  }
}


async function runCmd() {

// run command
const command = ['./tmp/a.out'];

const execOptions = {
  Cmd: command,
  AttachStdout: true,
  AttachStderr: false,
}

docker.getContainer('ec5ee5f63510').exec(execOptions, (err, exec) => {

    if(err) {
      console.log('error creating exec instance', err);
      return;
    }

      // start the exec instance
      exec.start((err, stream) => {
      if(err) {
        console.log('error starting exec instance', err);
        return;
      }

      // capture the stdout stream
      let stdout = '';
        stream.on('data', chunk => {
        stdout = chunk.toString(); 
      });

      // handle exec instance completion
      stream.on('end', () => {
        console.log('command executed successfully, output');
        console.log(stdout.length);
        console.log(stdout);
      })
    })
  })
}

