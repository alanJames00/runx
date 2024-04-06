const express = require('express');
const apiRouter = express.Router();
const fmt = require('./formatter');
const exec = require('../exec/execute');


apiRouter.get('/t', (req, res) => {

  res.json({
    info : 'hello runners'
  })
});


apiRouter.get('/runtimes', async (req, res) => {
  try {
    const result = [{
      runtime: 'javascript/nodejs',
      alias: 'js',
      version: 'lts'
    }];

    res.json(result);
  }
  catch(e) {
    console.log(e);
    res.status(500).json(e);
  }
})

apiRouter.post('/execute', async (req, res) => {
  try {
    
    const codeString = req.body.code;
    const runtime = req.body.runtime;

    const result = await exec.executeCode({
      codeString: codeString,
      runtime: runtime,
    })

    if(result == 'Invalid value for runtime') {
      res.json({
        err:'Invalid value for runtime' 
      })
    }
    else {

      const formattedResult = fmt.fmtOutput({
        exitCode: result.exitCode,
        stdout: result.stdout,
        stderr: result.stderr
      })

      res.json(formattedResult);
    }
  }
  catch(e) {
    console.log(e);
    res.status(500).json(e);
  }
})

// export the apiRouter
module.exports = apiRouter;
