const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware defs
app.use(express.json());

// Router mounts

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
})
