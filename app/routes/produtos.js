module.exports = function (app) {

    app.get('/produtos', function (req, res) {

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);

        produtosDAO.lista(function (erros, resultados) {
            res.format({
                html: function(){
                    res.render('produtos/lista', {lista: resultados});
                },
                json: function () {
                    res.json(resultados);
                }
            });
        });
        connection.end();
    });

    app.get('/produtos/form', function (req, res) {
        res.render('produtos/form');
    });

    app.post('/produtos', function (req, res) {

        var produto = req.body;

        var validadorTitulo = req.assert('titulo', 'Titulo é obrigatorio');
        validadorTitulo.notEmpty();

        var erros = req.validationErrors();

        if(erros){
            res.render('produtos/form');
            return;
        }

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.salva(produto, function (erros, resultados) {
           res.redirect('/produtos');
        });
    });
};

