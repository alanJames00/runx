const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const apiRouter = require('./api/routes');

// Connect to mongoDB


const app = express();
const PORT = 3000;

// Middleware defs
app.use(express.json());

// Router mounts
app.use('/api',apiRouter);

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
})
