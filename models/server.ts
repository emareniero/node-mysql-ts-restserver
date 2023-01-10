import express, { Application } from "express";
import colors from "colors";
import cors from "cors";

// Importamos las rutas
import userRoutes from "../routes/usuarios";

// Importamos la base de datos
import db from "../db/connection";

class Servidor {
  // Creamos el constructor en typescript
  // Primero hay que definir las propiedades
  private app: Application; // En ts se recomienda definir a que tipo corresponde cada variable
  private port: string; // le decimos a ts que port es una variable privada tipo string

  // Ahora definimos una variable para enlazar el servidor con las rutas
  private apiPaths = {
    // Difinimos cada uno de los path para cada una de las rutas
    usuarios: "/api/usuarios",
  };

  constructor() {
    this.app = express();
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
    this.app.use(cors());

    // Necesitamos leer el body de las peticiones
    this.app.use(express.json());

    // Carpeta publica dodne vamos a servir el contenido estatico, aqui iria la app hecha en react, angular, etc..
    this.app.use(express.static('public'))
  }

  // Conectamos la base de datos. En este caso vamo a usar MySQL con XAMMP. Por defecto el usuario es ROOT y el pass un string vacio
  async dbConnection() {
    // Hacemos un try catch en caso que falle la conexion
    try {

      await db.authenticate;
      console.log(colors.yellow("Base de datos conectada correctamente!"))

    } catch ( error: any ) {
      throw new Error( error )
    }
  }

  // Creamos un metodo para iniciar las rutas cundo se crea la instancia del servidor
  routes() {
    this.app.use(this.apiPaths.usuarios, userRoutes);
  }

  // Arrancamos el servidor
  listen() {
    // le decimos que ejecute la viriable app
    this.app.listen(this.port, () => {
      // avisamos donde esta corriendo
      console.log(colors.bgYellow.black("Servidor corriendo en el puerto: "), colors.yellow(`${this.port}`));
    });
  }
}

// Exportamos el servidor por defecto para que se puede inicializar en app.ts
export default Servidor;
