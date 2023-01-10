// Importamos el Router para deinifir las rutas de nuestras peticiones
import { Router } from "express";
import { deleteUsuario, getUsuario, getUsuarios, postUsuario, putUsuario } from "../controller/usuarios";

// Creamos una constante para epxortar las rutas
const router = Router();

router.get('/',         getUsuarios);
router.get('/:id',      getUsuario);
router.post('/',        postUsuario);
router.put('/:id',      putUsuario);
router.delete('/:id',   deleteUsuario);




// Exportamos las rutas al final porque no es una unica ruta
// sino podriamos poner el export default en definicion de la constante
export default router;