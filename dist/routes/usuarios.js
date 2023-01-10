"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Importamos el Router para deinifir las rutas de nuestras peticiones
const express_1 = require("express");
const usuarios_1 = require("../controller/usuarios");
// Creamos una constante para epxortar las rutas
const router = (0, express_1.Router)();
router.get('/', usuarios_1.getUsuarios);
router.get('/:id', usuarios_1.getUsuario);
router.post('/', usuarios_1.postUsuario);
router.put('/:id', usuarios_1.putUsuario);
router.delete('/:id', usuarios_1.deleteUsuario);
// Exportamos las rutas al final porque no es una unica ruta
// sino podriamos poner el export default en definicion de la constante
exports.default = router;
//# sourceMappingURL=usuarios.js.map