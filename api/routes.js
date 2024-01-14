const express = require('express');
const apiRouter = express.Router();

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
    
    // parse the code and runtime
    const codeString = req.body.code;
    const runtime = req.body.runtime;
  }
  catch(e) {
    console.log(e);
    res.status(500).json(e);
  }
})

// export the apiRouter
module.exports = apiRouter;
