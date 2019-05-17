const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./routes/index'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
