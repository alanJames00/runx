type TFmtOutputParams = {
    exitCode: number;
    stdout: string;
    stderr: string;
}

type TFmtOutputResult = {
    stdout: string | null;
    stderr: string | null;
    compile_output: string | null;
    signal: string | null;
    code: number | null;
}

export function fmtOutput({ exitCode, stdout, stderr }: TFmtOutputParams): TFmtOutputResult {

    const tmpl = {
        stdout: null,
        stderr: null,
        compile_output: null,
        signal: null,
        code: null
    }

    if (exitCode == 40) {
        // format compiler error
        return { ...tmpl, compile_output: stderr, code: -1, signal: 'COMPILE_ERR' }
    }

    else if (exitCode == 50) {
        // format runtime error
        return { ...tmpl, stderr: stderr, code: 1, signal: 'RUNTIME_ERR' }
    }

    else if (exitCode == 60) {
        return { ...tmpl, stdout: stdout.substring(0, 40), code: -2, signal: 'TIME_LIMIT_EXCEED' }
    }
    // handle successful compilation and running of code
    else {
        return { ...tmpl, stdout: stdout, code: 0, signal: 'SUCCESS' }
    }
}