var http = require('http');

describe('#ProdutosController', function () {
    it('#listagem json', function (funcaoFinalizacao) {
        var configuracoes = {
            hostname: 'localhost',
            port: 3000,
            path: '/produtos',
            headers: {
                'Accept': 'application/json'
            }
        };
        http.get(configuracoes, function (res) {
            if (res.statusCode == 200) {
                console.log("teste ok");
            }
            if (res.headers['content-type'] == 'application/json; charset=utf-8') {
                console.log("teste ok");
            }
            funcaoFinalizacao();
        });
    });
});