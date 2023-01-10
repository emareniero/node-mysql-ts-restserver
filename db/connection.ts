import { Sequelize } from 'sequelize';

// Creamos una instancia de Sqequelize
const db = new Sequelize('curso-node', 'root', '', { // El primer argumento es el nombre de la tabla, el segundo el usuario y el tercero la contrasena 

    // Aca pongo donde esta localizada mi base de datos, en este caso es local asi que es localhost, sino tendria que ser la direccion de hosting
    host: 'localhost',
    dialect: 'mysql',
    // logging: false, // // Para fines eductaivos esta bueno dejar el logging en true asi se puede ver todo en la consola.

}); 

export default db;