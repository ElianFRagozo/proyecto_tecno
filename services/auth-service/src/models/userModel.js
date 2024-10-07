const pool = require('../db'); // Pool de PostgreSQL

// Crear un nuevo usuario
const createUser = async (userType, documentoIdentidad, correo, contraseña, primerNombre, segundoNombre, primerApellido, segundoApellido) => {
    const result = await pool.query(
        'INSERT INTO usuarios (user_type, documento_identidad, correo, contraseña, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING user_id',
        [userType, documentoIdentidad, correo, contraseña, primerNombre, segundoNombre, primerApellido, segundoApellido]
    );
    return result.rows[0];
};

// Buscar usuario por correo
const findUserByEmail = async (correo) => {
    const result = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
    return result.rows[0];
};

module.exports = { createUser, findUserByEmail };
