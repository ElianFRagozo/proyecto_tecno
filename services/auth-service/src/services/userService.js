const db = require('../database/db');
const bcrypt = require('bcrypt');

const registerUser = async (userData) => {
  try {
    const { userId, user_type, documento_identidad, correo, contraseña } = userData;
    // Validación de campos obligatorios
    if (!userId || !user_type || !documento_identidad || !correo || !contraseña) {
      throw new Error('Todos los campos son obligatorios.');
    }
    // Validación de documento de identidad
    const existingUser = await db.query('SELECT 1 FROM usuarios WHERE documento_identidad = $1', [documento_identidad]);
    if (existingUser.rows.length > 0) {
      throw new Error('El documento de identidad ya está registrado.');
    }
    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    // Insertar nuevo usuario
    const newUser = await db.query(
      'INSERT INTO usuarios (user_id, user_type, documento_identidad, correo, contraseña) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [userId, user_type, documento_identidad, correo, hashedPassword]
    );
    return newUser.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  registerUser,
};