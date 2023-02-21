const http = require('http');
const fs = require('fs');
const _ = require('lodash');
const server = http.createServer((req, res) =>{
    // console.log(req.url, req.method);
    const num = _.random(1, 20);
    console.log(num);

    const great = _.once(()=>{
        console.log('Well Done');
    });
    great();


    //send an html file
    res.setHeader('content-type','text/html');

    let path = './crash course/'

    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html'
            res.statusCode = 200;
            break;
            case '/about-me':            
            res.statusCode = 301;
            res.setHeader('Location','/about')
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    fs.readFile(path,(err,data) =>{
        if (err) {
            console.log(err);
            res.end();
        }else{
            // res.write(data);  => if we need to access to multiable things we can use it
            res.end(data);
        }
    })

    //set header content type
    // res.setHeader('content-type','text/html');
    // res.write('<h1>hello islam</h1>');
    // res.write('<h3>wlcome back islam</h3>');
    // res.end();
});

server.listen(2000,'localhost',() =>{
    console.log('listening to request on port 2000');
});

