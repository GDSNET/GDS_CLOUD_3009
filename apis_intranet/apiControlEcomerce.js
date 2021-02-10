var sql = require('mssql');

exports.funControlEcomerce = function (req, res, next) {

    const pool = new sql.ConnectionPool({
        user: 'sa',
        password: 'sasa',
        server: '192.168.0.22',
        database: 'GDS_INTRANET_CL'
    })
    
    var reporte = req.body.reporte;
    var parametros = req.body.parametros;
    var conn = pool;

conn.connect().then(function () {
var req = new sql.Request(conn);

query = "exec [dbo].[sp_ctrl_e_commerce] '" + reporte +  "' , '" + parametros + "'"
//console.log(query);
conn.query(query).then( function (recordset) {
//console.log(recordset)

//console.log(recordset.recordset.length)

res.json(recordset.recordset)
            
}) 
    .catch(function (err) {
        console.log("ERROR 2" + query);
        res.json({"usuario":"ERROR",
                  "desc_error": err}); 
        conn.close();
    });

})
.catch(function (err) {
    console.log("ERROR 3");
    res.json({"usuario":"ERROR",
              "desc_error": err}); 
    conn.close();
});
}