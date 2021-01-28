var sql = require('mssql');

exports.funActualizaSkuIntranet = function (req, res, next) {
    
    const pool = new sql.ConnectionPool({
        user: 'sa',
        password: 'sasa',
        server: '192.168.0.22',
        database: 'GDS_INTRANET_CL'
    })

    var conn = pool;
    
    var id_sku_sap = req.body.id_sku_sap;
    var desc_imagen_sku = req.body.desc_imagen_sku;

   // console.log(arraydatos)
    //console.log(arraydatos.length)
   
    conn.connect().then(function () {
        var req = new sql.Request(conn);

    queryborradatos = "DELETE FROM [dbo].[p_e_com_imagen_sku] WHERE id_sku_sap = "+id_sku_sap+" "
    queryarraydatos = "INSERT INTO [dbo].[p_e_com_imagen_sku] values ("+id_sku_sap+",'"+desc_imagen_sku+"')"
   
       // console.log(queryarraydatos);
       conn.query(queryborradatos).then( function (recordset) {

        conn.query(queryarraydatos).then( function (recordset) {

            if (recordset.rowsAffected.length >0)
            {
            res.json({"data":"ok"});
            res.end();
            conn.close();
            }
            else
            {
            console.log ("0 filas afectadas");
            res.json({"data":"error"});
            res.end();
            conn.close();
            }

        }) .catch(function (err) {
            res.json({"data":err.message}); 
            res.end();
            conn.close();
            });
            
                   console.log ("DELETE");
                   res.end();
                   conn.close();
                 
            }).catch(function (err) {
                res.json({"data":err.message}); 
                res.end();
                conn.close();
                });
    }).catch(function (err) {
        res.json({"data":err.message}); 
        res.end();
        conn.close();
        });
                   }