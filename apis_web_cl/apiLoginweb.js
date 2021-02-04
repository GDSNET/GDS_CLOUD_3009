var sql = require('mssql');

exports.funLoginweb = function (req, res, next) {
    
    var username = req.body.username;
    var password = req.body.password;

    const pool = new sql.ConnectionPool({
        user: 'sa',
        password: 'sasa',
        server: '192.168.0.22',
        database: 'GDS_APP'
    })

    var conn = pool;

conn.connect().then(function () {
var req = new sql.Request(conn);

query = "SELECT * FROM [GDS_INTRANET_CL].[dbo].[v_gds_login_intranet] WHERE username = '"+username+"' AND password= '"+password+"'";
//console.log(query);
conn.query(query).then( function (recordset) {
//console.log(recordset)

//console.log(recordset.recordset.length)

if(recordset.recordset.length === 0){
    res.json({"usuario"  : "NOUSER"})
}
else{res.json(recordset.recordset[0])}
            
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