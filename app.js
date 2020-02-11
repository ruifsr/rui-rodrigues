const express = require('express');
const app = express();
app.use('/', express.static('www'));
app.listen(80, () => console.log('redirect active on port 80'));