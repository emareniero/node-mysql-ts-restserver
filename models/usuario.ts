import { DataTypes } from 'sequelize';
import db from '../db/connection';

// Creamos el usuario como lo tenemos en la base de datos y definimos sus props para no mandar info erroneo
const Usuario = db.define('Usuario', {

        nombre: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        estado: {
            type: DataTypes.BOOLEAN
        },
})


export default Usuario;

