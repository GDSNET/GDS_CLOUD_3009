var sql = require('mssql');

exports.funCargaPlanillaIntranet = function (req, res, next) {
    
    const pool = new sql.ConnectionPool({
        user: 'sa',
        password: 'sasa',
        server: '192.168.0.22',
        database: 'GDS_INTRANET_CL'
    })

    var conn = pool;
    
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
   
    conn.connect().then(function () {
        var req = new sql.Request(conn);

       queryarraydatos = "insert into [dbo].[dm_planilla_detalle] values ('"+desc_periodo+"',"+id_tie_semana+","+id_plataforma+","+id_sala+","+id_sku_sap+","+presencia+","+f_stock+",'"+f_imagen+"',"+f_descripcion+","+f_precio_unitario+","+f_precio_descuento+","+f_mecanica+","+f_alerta_quiebre+")"
   
       // console.log(queryarraydatos);
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