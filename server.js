// server.js — minimal Express server for DevOps Simulator
const express = require('express');
const app = express();

const port = process.env.APP_PORT || process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('DevOps Simulator running');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
