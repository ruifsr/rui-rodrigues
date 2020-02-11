const express = require('express');
const app = express();
app.use('/', express.static('www'));
app.listen(process.env.PORT ? process.env.PORT : 80, () => console.log('redirect active on port 80'));