var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool

var config = {
    user: 'sukrut27',
    database: 'sukrut27',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles = { 
'article-one': {
    title:  'Article One | Sukrut Dani',
    heading: 'Article One',
    date: '29 sept 2016',
    content: ` <p>
                    This is article one of my first webapp. I am feeling so happy about it.
                </p>
                <p>
                   SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.
                </p>
                <p>
                    SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.SUKRUT DANI.
                </p>`
},
'article-two': {
    title:  'Article Two | Sukrut Dani',
    heading: 'Article Two',
    date: '30 sept 2016',
    content: ` <p>
                    This is article two of my first webapp. I am feeling so happy about it.
                </p>
                <p>
                   SUKRUT DANI.
                </p>`
},
'article-three': {
    title:  'Article Three | Sukrut Dani',
    heading: 'Article Three',
    date: '27 Oct 2016',
    content: ` <p>
                    This is article three of my first webapp. I am feeling so happy about it.
                </p>`
}
};

function createTemplate (data) {
   
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
   
    var htmltemplate=
    `<html>
        <head>
            <title>
                ${title}    
            </title>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class="container">
                <div>
                    <a href="/">Home</a>
                </div>
                <hr/>
                <h3>
                    ${heading} 
                </h3>
                <div>
                    ${date}
                </div>
                <div>
                   ${content}
                </div>
            </div>
        </body>
    </html>
    `;
    return htmltemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/article-db', function(req,res) {
    pool.query('SELECT * FROM article', function (err,result) {
       if(err){
           res.status(500).send(err.toString());
       } 
       else{
           res.send(JSON.stringify(result));
       }
    });
});


var counter = 0;
app.get('/counter', function(req, res){
   counter = counter + 1;
   res.send(counter.toString());
});

var names = [];
app.get('/submit-name',function(req,res){
   var name = req.query.name;
   names.push(name);
   res.send(JSON.stringify(names));
});

app.get('/:articleName',function(req,res){
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
