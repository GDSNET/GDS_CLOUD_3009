var sql = require('mssql');

exports.funCargaPlanillaIntranet = function (req, res, next) {
    
    var sqlConfig = {
        user: 'sa',
        password: 'sasa',
        server: '192.168.0.22',
        database: 'GDS_INTRANET_CL',
        requestTimeout: 3000000
        }
        
    sql.close();
    
    let arraydatos = req.body;
    console.log(arraydatos)
    console.log(arraydatos.length)
   
                   sql.connect(sqlConfig, function() {
    var request = new sql.Request();
    
    var query_valores = "";
    try{arraydatos.map((value,i) => {
           console.log("ENTRA CONEXION")
          
          valores = null;
      if(i > 0){
       valores = ",('"+value.desc_periodo+"',"+value.id_tie_semana+","+value.id_plataforma+","+value.id_sala+","+value.id_sku_sap+","+value.presencia+","+value.f_stock+",'"+value.f_imagen+"',"+value.f_descripcion+","+value.f_precio_unitario+","+value.f_precio_descuento+","+value.f_mecanica+","+value.f_alerta_quiebre+")";
       query_valores = query_valores + valores;
      }else{
          console.log("else if");
          valores = "('"+value.desc_periodo+"',"+value.id_tie_semana+","+value.id_plataforma+","+value.id_sala+","+value.id_sku_sap+","+value.presencia+","+value.f_stock+",'"+value.f_imagen+"',"+value.f_descripcion+","+value.f_precio_unitario+","+value.f_precio_descuento+","+value.f_mecanica+","+value.f_alerta_quiebre+")";
            query_valores = valores + query_valores;
      }
          
       })}catch{   res.json({"data":"error"});
       res.end();} //CIERRE MAP

       queryarraydatos = "insert into [dbo].[dm_planilla_detalle] values" + query_valores
   
       // console.log(queryarraydatos);
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