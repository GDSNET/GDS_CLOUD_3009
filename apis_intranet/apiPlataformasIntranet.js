var sql = require('mssql');

exports.funPautaIntranet = function (req, res, next) {
    
    var id_usuario = req.body.id_usuario;
    var id_sala = req.body.id_sala;

    const pool = new sql.ConnectionPool({
        user: 'sa',
        password: 'sasa',
        server: '192.168.0.22',
        database: 'GDS_INTRANET_CL'
    })

    var conn = pool;

conn.connect().then(function () {
var req = new sql.Request(conn);

query = "SELECT DISTINCT id_plataforma, desc_plataforma FROM [dbo].[view_gds_e_com_pauta] WHERE id_usuario = '"+id_usuario+"' AND id_sala= "+id_sala+"";
//console.log(query);
conn.query(query).then( function (recordset) {
//console.log(recordset)

//console.log(recordset.recordset.length)

if(recordset.recordset.length === 0){
    res.json({"usuario"  : "NOUSER"})
}
else{res.json(recordset.recordset)}
            
}) 
    .catch(function (err) {
        console.log("ERROR 2");
        res.json({"usuario":"ERROR",
                  "desc_error": err}); 
        conn.close();
    });

})
.catch(function (err) {
    console.log("ERROR 2");
    res.json({"usuario":"ERROR",
              "desc_error": err}); 
    conn.close();
});
}