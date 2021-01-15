var sql = require('mssql');

exports.funMecanicaIntranet = function (req, res, next) {
    
    const pool = new sql.ConnectionPool({
        user: 'sa',
        password: 'sasa',
        server: '192.168.0.22',
        database: 'GDS_INTRANET_CL',
        requestTimeout: 300000
    })
    
    var conn = pool;
    
       
    conn.connect().then(function () {
        var req = new sql.Request(conn);
        console.log("SOY LA CONEXION")
    querys = "select * from dbo.[gds_cfg_mecanica]"
    console.log(querys)
    conn.query(querys).then(function (recordset) {
    
        res.json(recordset.recordset)
        res.end();
        conn.close();
    }) 
        .catch(function (err) {
            res.json({"usuario":"ERROR"}); 
            res.end();
            conn.close();
        });
    })
    .catch(function (err) {
    res.json({"usuario":"ERROR CONEXION"}); 
    res.end();
    conn.close();
    });
    }