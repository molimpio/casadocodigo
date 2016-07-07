var mysql = require('mysql');

var connectMYSQL = function() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'casadocodigo_nodejs'
    });
};

/**
 * esta fazendo assim para não conectar no BD quando subir o srv (load),
 * então só conecta quando invocar a função pelo caminho app.infra.connectionFactory();
 * @returns {connectMYSQL}
 */
module.exports = function () {
  return connectMYSQL;
};
