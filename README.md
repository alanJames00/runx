# runx

**runx** is a lightning-speed remote code execution service written in JavaScript.

## Features

- **Code Execution**: runx provides a platform for users to compile and execute code written in various programming languages.
- **Isolation**: Code execution is performed within isolated environments, ensuring security and preventing interference between different executions.
- **Support for Multiple Languages**: runx supports a wide range of programming languages, including C, C++, Python, and JavaScript.
- **Blazingly Fast**: Offers near local compilation and runtimes speed, No need to wait for 5 seconds to run your HelloWorld code as in tradition online compilers


## Public API
A Public API of runx is available for hobby users and testing purposes. It's limited to 5 submissions per second to enforce ***fair-usage policy***

**API URL**: https://runx.alanj.live/

### API Usage

1. List available languages or runtimes

`GET /api/runtimes`
This endpoint will return the supported languages along with the current version and alias. To execute
code for a particular language using the `/api/execute` endpoint, the alias must
be provided.

2. Execute code in a specific language

`POST /api/execute`
This endpoint requests execution of some arbitrary code.

-   `runtime` (**required**) The language to use for execution, must be a string. One of the alaises returned by `/api/runtimes` endpoint.
-   `code` (**required**) The source code to execute, must be a string containing text to compile and run.
-   `stdin` (_optional_) The text to pass as stdin to the program. Must be a string or left out. Defaults to blank string.

Sample Request:
```json
{

    "code" : "#include<iostream>\nusing namespace std;\nint main() { int a; cin>>a; cout<<(a+2); return 0; }",
    "runtime" : "cpp",
    "stdin": "5"
}
```

Sample Response:
```json
{
    "stdout": "7",
    "stderr": null,
    "compile_output": null,
    "signal": "SUCCESS",
    "code": 0
}
```

signal can be one of the following values:
-   `SUCCESS` - Execution completed successfully. Then stdout will contain the output of the program.
-   `RUNTIME_ERR` - Execution failed due to a runtime error. Then stderr will contain the error message.
-   `COMPILE_ERR` - Execution failed due to a compilation error. Then compile_output will contain the error message.
-   `TIME_LIMIT_EXCEED` - Execution failed due to time limit exceed (Default 2 seconds). Then stdout will contain the output of the program till the time limit exceed.

## Supported Languages
`c`,
`cpp`,
`python3`,
`nodejs`,

## Security Features
- **Isolation**: Code execution is performed within isolated environments, ensuring security and preventing interference between different executions. runx uses docker as primary isolation mechanism.
- **Time Limit**: runx enforces a time limit of 2 (default) seconds for code execution. If the code takes longer than 2 seconds to execute, the execution is terminated.
- **Process Limit**: runx enforces a process limit of 100 for code execution. This prevents users from running multiple processes in the same environment or running fork bombs.
- **Network Isolation**: runx containers are not allowed to access the network or internet. This prevents users from running malicious code that could access sensitive information or launch attacks.

## Self Hosting
Runx can be self hosted in any machines with docker. The self hosted runx has no limits on submissions and can be modified to any needs

Follow the below instruction to self host

### 1. Clone the repo and setup the project
```
    git clone https://github.com/alanJames00/runx.git

    cd runx/
    
    npm i
```


### 2. Setting up the docker image 

runx uses a special docker image named as 'runx-pod-ubuntu' to run the code in isolated environments. The image is available in docker hub. Pull the image using the below command

```
    docker pull alanjames00/runx-pod-ubuntu
```

## Contributing

Contributions to runx are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

runx is released under the MIT License. See the [LICENSE](LICENSE) file for details.

