const express = require('express');
const apiRouter = express.Router();

apiRouter.get('/t', (req, res) => {

  res.json({
    info : 'hello runners'
  })
});



// export the apiRouter
module.exports = apiRouter;
