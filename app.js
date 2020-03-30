/*jshint esversion: 6 */

const http = require('http');
const fs = require('fs');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');

const upload = multer();
const app = express();

const port = process.env.port || 3000;

app.use(upload.array());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));

app.post('/', (req,res) => {
    var rawText = req.body.usr2txt;

    var userHtml = '<div class="container msg-usr2 my-2 p-3"><img src="/w3images/bandmember.jpg" alt="Avatar"><p>' + rawText + '</p><span class="time-right">11:00</span></div>';

    $("#chat-window").append(userHtml);
});

app.listen(port, () => console.log(`Server running on port ${port}!`));

