const http = require('http');
const fs = require('fs');
const port = 4444;
const server = http.createServer((req, res) => {

    switch (true) {
        case req.url === '/' && req.method === 'GET':
            fs.readFile('./view/index.html', (err, data) => {
                res.setHeader('content-type', 'text/html');
                res.writeHeader(200);
                res.end(data);

            });
            break;

        case req.url === '/style.css' && req.method === 'GET':
            fs.readFile('./view/style.css', (err, data) => {
                res.setHeader('content-type', 'text/css');
                res.writeHeader(200);
                res.end(data);

            });
            break;

        case req.url === "/hambi.jpg" && req.method === "GET":
            fs.readFile("./public/hambi.jpg", (err, data) => {
                res.setHeader('Content-Type', 'image/jpg');
                res.writeHead(200);
                res.end(data);
            });

            break;

        case req.url === "/pizza.jpg" && req.method === "GET":
            fs.readFile("./public/pizza.jpg", (err, data) => {
                res.setHeader('Content-Type', 'image/jpg');
                res.writeHead(200);
                res.end(data);
            });

            break;

        case req.url === "/kaja" && req.method === "GET":
            fs.readFile('./data/kaja.json', (err, data) => {
                res.setHeader('Content-Type', 'application/json');
                res.writeHeader(200);
                res.end(data);
            })
            break;

        case req.url === "/kaja.js" && req.method === "GET":
            fs.readFile('./public/kaja.js', (err, data) => {
                res.setHeader('Content-Type', 'application/javascript');
                res.writeHeader(200);
                res.end(data);
            })
            break;

        case req.url === "/kaja" && req.method === "POST":
            let tartalom = '';
            req.on('data', (chunk) => {
                tartalom += chunk.toString();
            });

            req.on('end', () => {
                const ujKaja = JSON.parse(tartalom);

                if (!validateAr(ujKaja.ar)) {
                    console.log("Biztos volt 1000 Forint !...")
                    return;
                }

                if (!validateNev(ujKaja.neve)) {
                    console.log("Két betűs, se pizzában, se hambiban nincs!")
                    return;
                }


                fs.readFile("./data/kaja.json", (err, data) => {
                    let kajaim = JSON.parse(data);
                    kajaim.push({
                        valaszt: ujKaja.valaszt,
                        neve: ujKaja.neve,
                        ar: ujKaja.ar
                    });
                    fs.writeFile('./data/kaja.json', JSON.stringify(kajaim), () => {
                        res.end(JSON.stringify(ujKaja));
                    })
                })
            });
            break;


        default:
            fs.readFile("./view/error.html", (err, file) => {
                res.setHeader('Content-Type', 'text/html');
                res.writeHead(404);
                res.end(file);
            })
    }
});

server.listen(port);



function validateAr(ar) {
    return ar > 999;
}

function validateNev(neve) {
    return neve.length >= 3;
}