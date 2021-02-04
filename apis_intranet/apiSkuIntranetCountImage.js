var sql = require('mssql');

exports.funSelectCountImage = function (req, res, next) {

    const pool = new sql.ConnectionPool({
        user: 'sa',
        password: 'sasa',
        server: '192.168.0.22',
        database: 'GDS_INTRANET_CL'
    })

    var desc_categoria = req.body.desc_categoria;
    var conn = pool;

conn.connect().then(function () {
var req = new sql.Request(conn);

query = " SELECT * FROM [v_intranet_sku_adm_count_image]"
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