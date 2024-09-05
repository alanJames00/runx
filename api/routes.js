const express = require("express");
const apiRouter = express.Router();
const fmt = require("./formatter");
const exec = require("../exec/execute");
const runtimes = require("./runtimes");
const docker = require("../exec/docker");

const MAX_CONTAINERS = 5;

apiRouter.get("/health", (req, res) => {
	res.json({
		health: "ok",
	});
});

apiRouter.get("/runtimes", async (req, res) => {
	try {
		const result = runtimes.runtimes;

		res.json(result);
	} catch (e) {
		console.log(e);
		res.status(500).json(e);
	}
});

apiRouter.post("/execute", async (req, res) => {
	try {
		// check for the current running containers
		const currentContainers = docker.getContainerCount();

		if (MAX_CONTAINERS >= currentContainers) {
			const codeString = req.body.code;
			const runtime = req.body.runtime;
			const stdin = req.body.stdin;

			let stdinData = null;
			// check if stdin in valid
			if (stdin == "" || stdin == null || stdin == undefined) {
				stdinData = null;
			} else {
				stdinData = stdin;
			}

			const result = await exec.executeCode({
				codeString: codeString,
				runtime: runtime,
				stdinData: stdinData,
			});

			if (result == "Invalid value for runtime") {
				res.json({
					err: `${runtime} is unknown runtime. Please check the runtime and try again.`,
				});
			} else {
				const formattedResult = fmt.fmtOutput({
					exitCode: result.exitCode,
					stdout: result.stdout,
					stderr: result.stderr,
				});

				res.json(formattedResult);
			}
		} else {
			// queue the request
			res.status(404).json({
				err: "Server is busy now. Try Again",
			});
		}
	} catch (e) {
		console.log(e);
		res.status(500).json(e);
	}
});

// process the queue
// executeQueue.process

// export the apiRouter
module.exports = apiRouter;
