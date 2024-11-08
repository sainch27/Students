const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const qs = require('querystring')
require('./config/setupModel');


const studentsRoutes = require('./routes/studentsRoutes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.set('query parse', str => {
    return qs.parse(str);
})

app.use('/api/students',studentsRoutes);
module.exports = app;
