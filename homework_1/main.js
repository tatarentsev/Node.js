const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, {
        'Content-type' : 'text/html; charset=UTF-8'
    })
    res.end('<a href="/about">На страничку обо мне</a>');
    }

    else if (req.url === '/about') {
        res.writeHead(200, {
        'Content-type' : 'text/html; charset=UTF-8'
    })
    res.end('<a class="mainJ" href="/">На главную</a>');
    }

    else {
        res.writeHead(404, {
        'Content-type' : 'text/html; charset=UTF-8'
    })
    res.end('<h1>Страница не найдена</h1>')
    }
    
})

const port = '3000';

server.listen(port);