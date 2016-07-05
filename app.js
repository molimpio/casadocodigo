var express = require('express');
var app = express();

app.set('view engine','ejs');

app.get('/produtos', function (req, res) {
   console.log("listando");
   res.render("produtos/lista");
});

app.listen(3000, function () {
   console.log("Rodando servidor");
});

