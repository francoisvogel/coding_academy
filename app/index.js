require('dotenv').config();
const fs = require('fs');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const path = require('path');

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages/index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages/about.html'));
});

app.get('/problemset', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages/problemset.html'));
});

app.get('/guide', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages/guide.html'));
});

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

server.listen(process.env.PORT, () => {
    console.log('listening on *:' + process.env.PORT);
});