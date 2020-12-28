var sql = require('mssql');

exports.funActualizaEstadoSala = function (req, res, next) {
    
    var id_usuario = req.body.id_usuario;
    var id_sala = req.body.id_sala;
    var id_estado = req.body.id_estado;

    const pool = new sql.ConnectionPool({
        user: 'sa',
        password: 'sasa',
        server: '192.168.0.22',
        database: 'GDS_APP'
    })

    var conn = pool;

conn.connect().then(function () {
var req = new sql.Request(conn);

query = "UPDATE [dbo].[app_cfg_usuario_sala] SET estado = "+id_estado+"  WHERE id_usuario = "+id_usuario+" AND id_sala = "+id_sala+"";
//console.log(query);
conn.query(query).then( function (recordset) {
//console.log(recordset)
//console.log(recordset.recordset.length)
console.log(recordset.rowsAffected)

if(recordset.rowsAffected > 0){

    res.json({"mensaje"  : "OK"})

}else { res.json({"mensaje"  : "ERROR",
                   "desc_error": "Filas afectadas: " +recordset.rowsAffected}) }

}) 
    .catch(function (err) {
        console.log("ERROR 1");
        res.json({"mensaje":"ERROR",
                  "desc_error": err.message}); 
        conn.close();
    });

})
.catch(function (err) {
    console.log("ERROR 2");
    res.json({"mensaje":"ERROR",
              "desc_error": err.message}); 
    conn.close();
});
}