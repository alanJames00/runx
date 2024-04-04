const express = require('express');
const cors = require('cors');

const apiRouter = require('./api/routes');


const app = express();
const PORT = process.env.PORT | 3000;

// Middleware defs
app.use(cors());
app.use(express.json());

// Router mounts
app.use('/api',apiRouter);

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
})
