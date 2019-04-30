const app = require('express')();
const consign = require('consign');
const db = require('./config/db');
const mongoose = require('mongoose');

require('./config/mongodb');

app.db = db;
app.mongo = mongoose;

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./schedule')
    .then('./config/routes.js')
    .into(app);

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Backend executando na porta ${port}`);
});