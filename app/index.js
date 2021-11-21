require('dotenv').config();
const fs = require('fs');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const path = require('path');
const { json } = require('express');
const { resolveSoa } = require('dns');

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

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

app.get('/ide', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages/ide.html'));
});


app.get('/news', (req, res) => {
    if (req.query.article == undefined) {
        res.sendFile(path.join(__dirname, '../public/pages/news.html'));
    }
    else {
        var article = req.query.article;
        var location = path.join(__dirname, '../public/data/news/'+article+'.html');
        if (!fs.existsSync(location)) {
            res.sendFile(path.join(__dirname, '../public/pages/error404.html'));
        }
        else {
            var relevantData = require('../public/data/news/setup.json');
            relevantData = relevantData.news;
            var found = false;
            for (let i = 0; i < relevantData.length; i++) if (relevantData[i].id == article) {
                relevantData = relevantData[i];
                found = true;
                break;
            }
            if (!found) { // error file not reference in setup.json
                res.sendFile(path.join(__dirname, '../public/pages/error404.html'));
            }
            var content = fs.readFileSync(location, 'utf8');
            // content processing
            content = content.split('^br^').join('<br><br>');
            content = content.split('^img^').join('img class="rounded my-3 object-contain"')
            var template = fs.readFileSync(path.join(__dirname, '../public/pages/article.html'), 'utf-8');
            var compiled = template;
            compiled = compiled.split('^id^').join(relevantData.id);
            compiled = compiled.split('^title^').join(relevantData.name);
            compiled = compiled.split('^author^').join(relevantData.author);
            compiled = compiled.split('^date_year^').join(relevantData.date_year);
            compiled = compiled.split('^date_month^').join(relevantData.date_month);
            compiled = compiled.split('^date_day^').join(relevantData.date_day);
            compiled = compiled.split('^read^').join(relevantData.read);
            compiled = compiled.split('^content^').join(content);
            fs.writeFileSync(path.join(__dirname, 'dump.html'), compiled);
            res.sendFile(path.join(__dirname, 'dump.html'));
        }
    }
});

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

server.listen(process.env.PORT, () => {
    console.log('listening on *:' + process.env.PORT);
});