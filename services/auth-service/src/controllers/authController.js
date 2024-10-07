const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');
const { createUser, findUserByEmail } = require('../models/userModel');
const { hashPassword, comparePassword } = require('../utils/hash');

const registerUser = async (req, res) => {
    const {
        userType,
        documentoIdentidad,
        correo,
        contraseña,
        confirmarContraseña,
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
    } = req.body;

    if (contraseña !== confirmarContraseña) {
        return res.status(400).json({ error: 'Las contraseñas no coinciden' });
    }

    try {
        const hashedPassword = await hashPassword(contraseña); // Usa la función hashPassword
        const user = await createUser(
            userType,
            documentoIdentidad,
            correo,
            hashedPassword,
            primer_nombre,
            segundo_nombre,
            primer_apellido,
            segundo_apellido
        );
        res.status(201).json({ message: 'Usuario registrado con éxito', user });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
};

const loginUser = async (req, res) => {
    const { correo, contraseña } = req.body;

    try {
        const user = await findUserByEmail(correo);
        if (!user) {
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }

        const isMatch = await comparePassword(contraseña, user.contraseña); // Usa la función comparePassword
        if (!isMatch) {
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }

        const token = jwt.generateToken(user.user_id);
        res.status(200).json({ message: 'Login exitoso', token });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

module.exports = { registerUser, loginUser };
