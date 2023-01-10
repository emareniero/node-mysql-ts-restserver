"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const colors_1 = __importDefault(require("colors"));
const cors_1 = __importDefault(require("cors"));
// Importamos las rutas
const usuarios_1 = __importDefault(require("../routes/usuarios"));
// Importamos la base de datos
const connection_1 = __importDefault(require("../db/connection"));
class Servidor {
    constructor() {
        // Ahora definimos una variable para enlazar el servidor con las rutas
        this.apiPaths = {
            // Difinimos cada uno de los path para cada una de las rutas
            usuarios: "/api/usuarios",
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "8000";
        // Llamamos a la base de datos
        this.dbConnection();
        // Llamamos a los middlewares antes que las rutasss! No olvidatar, y ademas, si no lo llamamos no se va a ejecutar! Ja!
        this.middlewares();
        // Definimos las rutas en el constructor
        this.routes();
    }
    // Definimos los middlewares para verificar la info que viene antes de pasar a las rutas
    middlewares() {
        // Necesitamos ocnfigurar el CORS
        this.app.use((0, cors_1.default)());
        // Necesitamos leer el body de las peticiones
        this.app.use(express_1.default.json());
        // Carpeta publica dodne vamos a servir el contenido estatico, aqui iria la app hecha en react, angular, etc..
        this.app.use(express_1.default.static('public'));
    }
    // Conectamos la base de datos. En este caso vamo a usar MySQL con XAMMP. Por defecto el usuario es ROOT y el pass un string vacio
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            // Hacemos un try catch en caso que falle la conexion
            try {
                yield connection_1.default.authenticate;
                console.log(colors_1.default.yellow("Base de datos conectada correctamente!"));
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // Creamos un metodo para iniciar las rutas cundo se crea la instancia del servidor
    routes() {
        this.app.use(this.apiPaths.usuarios, usuarios_1.default);
    }
    // Arrancamos el servidor
    listen() {
        // le decimos que ejecute la viriable app
        this.app.listen(this.port, () => {
            // avisamos donde esta corriendo
            console.log(colors_1.default.bgYellow.black("Servidor corriendo en el puerto: "), colors_1.default.yellow(`${this.port}`));
        });
    }
}
// Exportamos el servidor por defecto para que se puede inicializar en app.ts
exports.default = Servidor;
//# sourceMappingURL=server.js.map