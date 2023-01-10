"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Creamos una instancia de Sqequelize
const db = new sequelize_1.Sequelize('curso-node', 'root', '', {
    // Aca pongo donde esta localizada mi base de datos, en este caso es local asi que es localhost, sino tendria que ser la direccion de hosting
    host: 'localhost',
    dialect: 'mysql',
    // logging: false, // // Para fines eductaivos esta bueno dejar el logging en true asi se puede ver todo en la consola.
});
exports.default = db;
//# sourceMappingURL=connection.js.map