const express = require('express');
const bodyParser= require('body-parser');
const compression = require('compression');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');
const staticFiles = express.static(path.join(__dirname, '../ui'))
const router = require('./api/routes');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(staticFiles);
app.use(compression());
router(app);
app.listen(port, () => console.log(`Listening on port ${port}`));
