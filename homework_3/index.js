const express = require('express');
const app = express();
const fs = require('fs');

let countOfFirstPage = 0;
app.get('/', (req, res) => {
    countOfFirstPage++;
    fs.writeFileSync("counter.txt", String(countOfFirstPage));
    res.send(`
        <h1>Корневая страница</h1> 
        <p>Просмотров: ${fs.readFileSync('counter.txt', 'utf8')}</p>
        <a href="/about">Ссылка на страницу /about</a>
        `);
});

let countOfFirstPageAbout = 0;
app.get('/about', (req, res) => {
    countOfFirstPageAbout++;
    fs.writeFileSync("counter2.txt", String(countOfFirstPageAbout));
    res.send(`
        <h1>Страница About</h1> 
        <p>Просмотров: ${fs.readFileSync('counter2.txt', 'utf8')}</p>
        <a href="/">Ссылка на главную страницу</a>
        `);
});

const port = '3000';

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
})