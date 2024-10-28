const Usuarios = require('../models/userModel'); // Asegúrate de que esta sea la ruta correcta
const bcrypt = require('bcrypt');

const createUser = async (userData) => {
  try {
      const { user_type, documento_identidad, correo, contraseña, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido } = userData;

      // Validación de campos obligatorios
      if (!user_type || !documento_identidad || !correo || !contraseña || !primer_nombre || !primer_apellido) {
          throw new Error('Todos los campos son obligatorios.');
      }

      // Validación de documento de identidad
      const existingUser = await Usuarios.findOne({ where: { documento_identidad } });
      if (existingUser) {
          throw new Error('El documento de identidad ya está registrado.');
      }

      // Insertar nuevo usuario usando Sequelize
      const newUser = await Usuarios.create({
          user_type,
          documento_identidad,
          correo,
          contraseña, // Almacenar la contraseña encriptada
          primer_nombre,
          segundo_nombre,         // Asegúrate de que esta línea esté presente
          primer_apellido,
          segundo_apellido,
      });

      return newUser; // Retorna el nuevo usuario creado
  } catch (error) {
      throw error; // Propaga el error para manejo posterior
  }
};

module.exports = {
  createUser,
};


