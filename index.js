const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./routes/index'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
