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
    
    var desc_periodo = req.body.desc_periodo;
    var id_tie_semana = req.body.id_tie_semana;
    var id_plataforma = req.body.id_plataforma;
    var id_sala = req.body.id_sala;
    var id_sku_sap = req.body.id_sku_sap;
    var presencia = req.body.presencia;
    var f_stock = req.body.f_stock;
    var f_imagen = req.body.f_imagen;
    var f_descripcion = req.body.f_descripcion;
    var f_precio_unitario = req.body.f_precio_unitario;
    var f_precio_descuento = req.body.f_precio_descuento;
    var f_mecanica = req.body.f_mecanica;
    var f_alerta_quiebre = req.body.f_alerta_quiebre;

   // console.log(arraydatos)
    //console.log(arraydatos.length)
   
    sql.connect(sqlConfig, function() {
    var request = new sql.Request();

       queryarraydatos = "insert into [dbo].[dm_planilla_detalle] values ('"+desc_periodo+"',"+id_tie_semana+","+id_plataforma+","+id_sala+","+id_sku_sap+","+presencia+","+f_stock+",'"+f_imagen+"',"+f_descripcion+","+f_precio_unitario+","+f_precio_descuento+","+f_mecanica+","+f_alerta_quiebre+")"
   
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