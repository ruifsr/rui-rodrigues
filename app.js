const express = require('express');
const app = express();
app.use('/', express.static('www'));
const port = process.env.PORT ? process.env.PORT : 80;
app.listen(port, () => console.log('Listening on port', port));