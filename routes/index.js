var express = require('express');
var router = express.Router();

var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'mario',
  password : 'admin',
  database : 'test'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/node-api/v1', function(req, res, next) {
  connection.query('SHOW TABLES', function (err, rows, fields) {
    let result = rows;
    if (err) throw err
    console.log('Filas: ', result)
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ result }));
  })
});

router.get('/node-api/v1/book', function(req, res, next) {
  connection.query('SELECT * FROM books', function (err, rows, fields) {
    if (err) throw err
    console.log('Filas: ', rows)
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ rows }));
  })
});

module.exports = router;
