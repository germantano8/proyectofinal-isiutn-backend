const TipoVehiculo = require('../models/tipoVehiculo');

const tipoVehiculoController = {

    getAll: async (req, res) => {
        try{
            const tipoVehiculo = await TipoVehiculo.findAll();
            if(!tipoVehiculo) return res.status(400).json({error: 'No hay tipos de vehiculo'});

            return res.status(200).json(tipoVehiculo);
        }catch(err){
            return res.status(500).json({error: 'Error al recuperar los datos'});
        }
        
    },
    getOne: async(req, res) => {
        try{
            if(!req.params.id) return res.status(400).json({error: 'Falta id'});
            const tipoVehiculo = await TipoVehiculo.findByPk(req.params.id);

            if(!tipoVehiculo) return res.status(404).json({error: 'Tipo de vehiculo no encontrado'});

            return res.status(200).json(tipoVehiculo);
        }catch(err){
            return res.status(500).json({error: 'Error al recuperar los datos'});
        }
        
    },
    create: async(req, res) => {
        try{
            const newTipoVehiculo = await TipoVehiculo.create({
                descripcion: req.body.descripcion, 
                tipo_licencia: req.body.tipo_licencia
            });

            return res.status(200).json(newTipoVehiculo);
        }catch(err){
            return res.status(500).json({error: 'Error al crear la entidad'});
        }
    },
    update: async(req, res) => {
        try{
            if(!req.params.id) return res.status(400).json({error: 'Falta id'});
            const tipoVehiculo = await TipoVehiculo.findByPk(req.params.id);

            if(!tipoVehiculo) return res.status(404).json({error: 'Tipo de vehiculo no encontrado'});

            await TipoVehiculo.update({
                descripcion: req.body.descripcion, 
                tipo_licencia: req.body.tipo_licencia
            },{
                where: {
                    id: req.params.id
                }
            });

            return res.status(200).json({message: 'Tipo de vehiculo actualizado'});
        }catch(err){
            return res.status(500).json({error: 'Error al actualizar la entidad'});
        }
    },
    delete: async(req, res) => {
        try{
            if(!req.params.id) return res.status(400).json({error: 'Falta id'});
            const tipoVehiculo = await TipoVehiculo.findByPk(req.params.id);

            if(!tipoVehiculo) return res.status(404).json({error: 'Tipo de vehiculo no encontrado'});

            await TipoVehiculo.destroy({
                where: {
                    id: req.params.id
                }
            });

            return res.status(200).json({message: 'Tipo de vehiculo eliminado'});
        }catch(err){
            return res.status(500).json({error: 'Error al eliminar la entidad'});
        }
    }
}

module.exports = tipoVehiculoController;