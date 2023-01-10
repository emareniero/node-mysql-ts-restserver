// El dotenv siempre va en el punto de entrada de mi app
import * as dotenv from "dotenv";
import Servidor from "./models/server";

// Esto lo hacemos para leer la configuracion por defecto de las variables de entorno
dotenv.config(); 

// creamos una nueva instancia de nuestro servidor
const servidor = new Servidor();

// Inicializmos el servidor
servidor.listen();
