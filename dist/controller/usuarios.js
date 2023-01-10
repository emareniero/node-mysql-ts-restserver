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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
// Como tenemos definido en el tsconfig que strict este en true, cada variable que no este definida me la va a macar
// eso es bueno porque sabes siempre donde hya un posible problema, por eso aca si o si definimos la request (req) y la response (res)
// Aca directamente exportamos la  funcion
// Definimos una funcion para ver todos los usuarios
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Creamos una constante para leer los usuarios de la DB
    const usuarios = yield usuario_1.default.findAll(); // usamos el awai porque find all es una Prmise
    // Mandamos un  mensjae
    res.json({ usuarios });
});
exports.getUsuarios = getUsuarios;
// Deinifmos una funcion para obtener un usuario por id
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Desestructuramos el usuario de la request
    const { id } = req.params;
    // Buscamos el usuario que concide con el id
    const usuario = yield usuario_1.default.findByPk(id);
    // Verificamos que exita el usuario en la base de datos
    if (!usuario) {
        // Avisamo que no existe el usuario!
        res.status(400).json({
            msg: `El usuario con el id ${id} no existe en la bd`,
        });
    }
    else {
        // Mandamos un  mensjae
        res.json({ usuario });
    }
});
exports.getUsuario = getUsuario;
// Definimos una funcion para agregar un usuario a la bd
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Desestructuramos el body de la request
    const { body } = req;
    // Ponems un try y un catch por si algo no sale bien
    try {
        // Revisemos si tiene email antes de grabar
        const existeEmail = yield usuario_1.default.findOne({
            where: {
                email: body.email,
            },
        });
        //  Si existe un usuario con el mail hacemos un if
        if (existeEmail) {
            return res.status(400).json({
                msg: `Ya existe un usuario con el correo: ${body.email}`,
            });
        }
        // Creamos el usuario con la info que viene en el body
        const usuario = usuario_1.default.build(body);
        yield usuario.save();
        // Mandamos un  mensjae con el usuario creado
        res.json({ usuario });
    }
    catch (error) {
        // vemos el error en consola
        console.log(error);
        // mandamos un msg
        res.status(500).json({
            msg: "Hable con el administrador",
        });
    }
});
exports.postUsuario = postUsuario;
// Definimos una funcion para actualizar un usuario
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Desestructuramos el usuario de la request
    const { id } = req.params;
    // Desestructuramos el body de la request
    const data = __rest(req.body, []);
    // Ponems un try y un catch por si algo no sale bien
    try {
        // vamos a ver si hay usuario con ese id porque sino no hya nad que podamos actualizar
        const usuario = yield usuario_1.default.findByPk(id);
        // si no existe no actualziamos nada y avisamos
        if (!usuario) {
            return res.status(400).json({
                msg: `No existe un usuario con el id: ${id}`,
            });
        }
        // actualizamos el usuario
        yield usuario_1.default.update(data, { where: { id: id } });
        // Mostramos la resputa
        res.status(201).json({
            usuario,
            msg: "Usuario actualizado exitosamente!",
        });
    }
    catch (error) {
        // vemos el error en consola
        console.log(error);
        // mandamos un msg
        res.status(500).json({
            msg: "Hable con el administrador",
        });
    }
});
exports.putUsuario = putUsuario;
// Deinifmos una funcion para borrar un usuario
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Desestructuramos el usuario de la request
    const { id } = req.params;
    // vamos a ver si hay usuario con ese id porque sino no hya nad que podamos borrar
    const usuario = yield usuario_1.default.findByPk(id);
    // si no existe no actualziamos nada y avisamos
    if (!usuario) {
        return res.status(400).json({
            msg: `No existe un usuario con el id: ${id}`,
        });
    }
    // actualizamos el estado del usuario
    yield usuario.update({ estado: false });
    // Mandamos un  mensjae
    res.json({
        usuario,
        msg: "Usuario borrado!",
    });
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.js.map