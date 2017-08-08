 // Require express module for router creation.
var express = require("express");
var router = express.Router();

// Require burger model.
var burger = require('../models/burger.js');


router.get('/', function(req, res) {
  burger.findAll().then(function(data) {
    // Render object in handlebars.
    res.render('index', {burgers: data});
  });
});

router.post("/", function(req, res) {
  burger.create({
    burger_name: req.body.burger_name  
  }).then(function() {
    // Reload home page.
    res.send({redirect: "/"});
  });
});

router.put("/:id", function(req, res) {
  let values = { devoured: true };
  let selectors = { where: { id: req.params.id } };
  burger.update(values, selectors).then(function() {
    // Reload home page.
    res.redirect('/');
  });
});


// Export routes for server.js to use.
module.exports = router;