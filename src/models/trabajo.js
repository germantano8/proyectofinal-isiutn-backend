const {DataTypes} = require('sequelize');
const sequelize = require('../database/connection');
const vehiculo = require('./vehiculo');
const proyecto = require('./proyecto');
const conductor = require('./conductor');
const cliente = require('./cliente');

const trabajo = sequelize.define('trabajo', {
    id_trabajo:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    fecha_desde: {
        type: DataTypes.DATEONLY, 
        allowNull: false
    },
    fecha_hasta: {
        type: DataTypes.DATEONLY, 
        allowNull: true
    },
    kilometraje:{
        type: DataTypes.INTEGER,
        allowNull: true,
        min: 0,
        max: 999999
    },
    patente: {
        type: DataTypes.STRING,
        allowNull: true,
        min: 6,
        max: 10,
        references: {
            model: vehiculo,
            key: 'patente'
        }
    },
    id_proyecto: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: proyecto,
            key: 'id'
        }
    },
    dni_conductor: {
        type: DataTypes.STRING,
        allowNull: true,
        min: 8,
        max: 8,
        references: {
            model: conductor,
            key: 'dni'
        }
    },
    cuit_cliente: {
        type: DataTypes.STRING,
        allowNull: true,
        min: 11,
        max: 11,
        references: {
            model: cliente,
            key: 'cuit'
        }
    }

    }, {
    timestamps: false,
    freezeTableName:true,
    }
);

trabajo.belongsTo(proyecto, { foreignKey: 'id_proyecto' });
trabajo.belongsTo(conductor, { foreignKey: 'dni_conductor' });
conductor.hasMany(trabajo, {foreignKey: 'dni_conductor'});

trabajo.belongsTo(cliente, { foreignKey: 'cuit_cliente' });

trabajo.belongsTo(vehiculo, { foreignKey: 'patente' });
vehiculo.hasMany(trabajo, {foreignKey: 'patente'});

module.exports = trabajo;