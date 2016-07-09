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

    var erros = "";

    app.get('/produtos/form', function (req, res) {
        res.render('produtos/form', {errosValidacao: erros, produto: ""});
    });

    app.post('/produtos', function (req, res) {

        var produto = req.body;

        req.assert('titulo', 'Titulo é obrigatorio').notEmpty();
        req.assert('preco', 'Preço é obrigatorio').isFloat();


        erros = req.validationErrors();

        if(erros){
            res.format({
                html: function(){
                    res.status(400).render('produtos/lista', {errosValidacao: erros});
                },
                json: function () {
                    res.status(400).json(erros);
                }
            });

            res.render('produtos/form', {errosValidacao: erros, produto: produto});
            return;
        }

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.salva(produto, function (erros, resultados) {
           res.redirect('/produtos');
        });
    });
};

