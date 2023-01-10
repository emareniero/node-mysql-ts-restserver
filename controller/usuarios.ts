import { Request, Response } from "express";
import Usuario from "../models/usuario";

// Como tenemos definido en el tsconfig que strict este en true, cada variable que no este definida me la va a macar
// eso es bueno porque sabes siempre donde hya un posible problema, por eso aca si o si definimos la request (req) y la response (res)
// Aca directamente exportamos la  funcion

// Definimos una funcion para ver todos los usuarios
export const getUsuarios = async (req: Request, res: Response) => {
  // Creamos una constante para leer los usuarios de la DB
  const usuarios = await Usuario.findAll(); // usamos el awai porque find all es una Prmise

  // Mandamos un  mensjae
  res.json({ usuarios });
};

// Deinifmos una funcion para obtener un usuario por id
export const getUsuario = async (req: Request, res: Response) => {
  // Desestructuramos el usuario de la request
  const { id } = req.params;

  // Buscamos el usuario que concide con el id
  const usuario = await Usuario.findByPk(id);

  // Verificamos que exita el usuario en la base de datos
  if (!usuario) {
    // Avisamo que no existe el usuario!
    res.status(400).json({
      msg: `El usuario con el id ${id} no existe en la bd`,
    });
  } else {
    // Mandamos un  mensjae
    res.json({ usuario });
  }
};

// Definimos una funcion para agregar un usuario a la bd
export const postUsuario = async (req: Request, res: Response) => {
  // Desestructuramos el body de la request
  const { body } = req;

  // Ponems un try y un catch por si algo no sale bien
  try {
    // Revisemos si tiene email antes de grabar
    const existeEmail = await Usuario.findOne({
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
    const usuario = Usuario.build(body);
    await usuario.save();

    // Mandamos un  mensjae con el usuario creado
    res.json({ usuario });
  } catch (error: any) {
    // vemos el error en consola
    console.log(error);
    // mandamos un msg
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

// Definimos una funcion para actualizar un usuario
export const putUsuario = async (req: Request, res: Response) => {
  // Desestructuramos el usuario de la request
  const { id } = req.params;

  // Desestructuramos el body de la request
  const { ...data } = req.body;

  // Ponems un try y un catch por si algo no sale bien
  try {
    // vamos a ver si hay usuario con ese id porque sino no hya nad que podamos actualizar
    const usuario = await Usuario.findByPk(id);

    // si no existe no actualziamos nada y avisamos
    if (!usuario) {
      return res.status(400).json({
        msg: `No existe un usuario con el id: ${id}`,
      });
    }

    // actualizamos el usuario
    await Usuario.update(data, { where: { id: id } });

    // Mostramos la resputa
    res.status(201).json({
      usuario,
      msg: "Usuario actualizado exitosamente!",
    });
  } catch (error: any) {
    // vemos el error en consola
    console.log(error);
    // mandamos un msg
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

// Deinifmos una funcion para borrar un usuario
export const deleteUsuario = async (req: Request, res: Response) => {
  // Desestructuramos el usuario de la request
  const { id } = req.params;

  // vamos a ver si hay usuario con ese id porque sino no hya nad que podamos borrar
  const usuario = await Usuario.findByPk(id);

  // si no existe no actualziamos nada y avisamos
  if (!usuario) {
    return res.status(400).json({
      msg: `No existe un usuario con el id: ${id}`,
    });
  }

  // actualizamos el estado del usuario
  await usuario.update({ estado: false });

  // Mandamos un  mensjae
  res.json({
    usuario,
    msg: "Usuario borrado!",
  });
};
