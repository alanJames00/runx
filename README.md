# runx

**runx** is a lightning-speed remote code execution service written in JavaScript.

## Features

- **Code Execution**: runx provides a platform for users to compile and execute code written in various programming languages.
- **Isolation**: Code execution is performed within isolated environments, ensuring security and preventing interference between different executions.
- **Support for Multiple Languages**: runx supports a wide range of programming languages, including C, C++, Python, and JavaScript.
- **Blazingly Fast**: Offers near local compilation and runtimes speed, No need to wait for 5 seconds to run your HelloWorld code as in tradition online compilers


## Public API
A Public API of runx is available for hobby users and testing purposes. It's limited to 5 submissions per second to enforce ***fair-usage policy***

## Self Hosting
Runx can be self hosted in any machines with docker. The self hosted runx has no limits on submissions and can be modified to any needs

Follow the below instruction to self host

### 1. Clone the repo
```
    git clone https://github.com/alanJames00/runx.git
```

### 2. 

runx uses a special docker image named as 'runx-pod-ubuntu' to run the code in isolated environments. The image is available in docker hub. Pull the image using the below command

```
    docker pull alanjames00/runx-pod-ubuntu
```

## Contributing

Contributions to runx are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

runx is released under the MIT License. See the [LICENSE](LICENSE) file for details.

