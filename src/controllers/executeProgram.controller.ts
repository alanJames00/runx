import { Request, Response } from "express";
import { runtimes } from "../api/runtimes";
import dockerClient from "../execution/dockerClient";
import { executeCode } from "../execution/executor"
import { fmtOutput } from "../api/formatter";
import cacheService from "../cache/cache.service";

interface IExecuteProgramReqBody {
    code: string;
    runtime: string;
    stdin?: string;
}

const MAX_CONTAINERS = 5;

const validateReqBody = ({
    code,
    runtime
}: IExecuteProgramReqBody): { isValid: boolean, error?: string } => {

    if (!code) {
        return {
            isValid: false,
            error: "code is required",
        }
    }

    if (
        !runtime ||
        !runtimes.map(r => r.runtime_alias).includes(runtime)
    ) {
        return {
            isValid: false,
            error: "missing or invalid runtime",
        }
    }

    return {
        isValid: true,
    }
}

export const executeProgram = async (
    req: Request<{}, {}, IExecuteProgramReqBody>,
    res: Response
) => {
    const { code, runtime, stdin } = req.body;
    const { isValid, error } = validateReqBody(req.body);
    if (!isValid) {
        return res.status(400).json({
            error: error,
        });
    }

    try {
        // check cache for the result
        const cachedResult = await cacheService.getResult({
            code,
            runtime,
            stdin: stdin || "",
        });

        if (cachedResult) {
            return res.status(200).json(cachedResult);
        }

        const currentContainers = dockerClient.getContainerCount();
        if (MAX_CONTAINERS <= currentContainers) {
            return res.status(404).json({
                error: "Server is busy now. Try Again",
            });
        }

        let stdinData: string | null = null;
        if (stdin == "" || stdin == null || stdin == undefined) {
            stdinData = null;
        } else {
            stdinData = stdin;
        }

        const result = await executeCode({
            codeString: code,
            runtime: runtime,
            stdinData: stdinData,
        });

        if (result == "Invalid value for runtime") {
            return res.status(400).json({
                error: `${runtime} is unknown runtime. Please check the runtime and try again.`,
            });
        }

        const formattedResult = fmtOutput({
            exitCode: (result as any).exitCode,
            stdout: (result as any).stdout,
            stderr: (result as any).stderr,
        });

        // cache the result
        await cacheService.setResult(
            {
                code,
                runtime,
                stdin: stdin || "",
            },
            formattedResult,
            parseInt(process.env.CACHE_EXPIRES_SECONDS!)
        );

        return res.status(200).json(formattedResult);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal server error",
        });
    }
}