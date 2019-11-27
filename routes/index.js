var express = require('express');
var router = express.Router();

var palvelu = require('./topic');

router.get('/', function(req, res, next) {
  palvelu.getAllUsers(function(results) {
    //res.render('index', {result: results});
    res.json(results);
  });
  //res.render('index', {title: "Oma otsikko", nimi: "Pertti"})
});

router.get('/api/topics', function(req, res) {
  palvelu.getAllUsers(function(results) {
    res.json(results);
  });
});

router.get('/api/topics/:id', function(req, res) {
  palvelu.getSingleUser(req, function(results) {
    res.json(results);
  });
});

router.post('/api/topics', function(req, res) {
  palvelu.createUser(req, function() {
    res.status(201).end();
  });
});

router.put('/api/topics/:id', function(req, res) {
  palvelu.updateUser(req, function() {
    res.status(200).end();
  });
});

router.delete('/api/topics/:id', function(req, res) {
  palvelu.removeUser(req, res, function() {});
});

//Automaationa tehty:
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
