var sql = require('mssql');

exports.funSelectCalidadSkuIntranet = function (req, res, next) {

    const pool = new sql.ConnectionPool({
        user: 'sa',
        password: 'sasa',
        server: '192.168.0.22',
        database: 'GDS_INTRANET_CL'
    })

    var conn = pool;

conn.connect().then(function () {
var req = new sql.Request(conn);

query = "SELECT DISTINCT desc_categoria FROM [dbo].[v_intranet_sku_adm]"
//console.log(query);
conn.query(query).then( function (recordset) {
//console.log(recordset)

//console.log(recordset.recordset.length)

res.json(recordset.recordset)
            
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