var sql = require('mssql');

exports.funInsertSkuIntranet = function (req, res, next) {
    
    var sqlConfig = {
        user: 'sa',
        password: 'sasa',
        server: '192.168.0.22',
        database: 'GDS_INTRANET_CL',
        requestTimeout: 3000000
        }
        
    sql.close();
    
    let id_sku_sap = req.body.id_sku_sap;
    let desc_imagen_sku = req.body.desc_imagen_sku;

                   sql.connect(sqlConfig, function() {
    var request = new sql.Request();

queryarraydatos = "insert into [dbo].[p_e_com_imagen_sku] values("+id_sku_sap+",'"+desc_imagen_sku+"',GETDATE())" 
   
        console.log(queryarraydatos);
            request.query(queryarraydatos, function(err, recordset) {
   
               try {
                   if (recordset.rowsAffected.length >0)
                   {
                   res.json({"data":"ok"});
                   res.end();
                   }
                   else
                   {
                   console.log ("0 filas afectadas");
                   res.json({"data":"error"});
                   res.end();
                   }
               } catch (error) {
                   res.json({"data":err});
                   res.end();
               }
             
            })
    })
                   }