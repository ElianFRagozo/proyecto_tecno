const jwt = require('../utils/jwt');
const { createUser } = require('../services/userService'); // Ajusta la ruta según la estructura de tu proyecto
const { hashPassword, comparePassword } = require('../utils/hash');
const Usuarios = require('../models/userModel'); 
const bcrypt = require('bcrypt');
// Controlador para registrar un nuevo usuario
const registerUser = async (req, res) => {
    const {
        user_type,
        documento_identidad,
        correo,
        contraseña,
        confirmarContraseña,
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
    } = req.body;

    console.log('Cuerpo de la solicitud:', req.body); // Imprimir el cuerpo de la solicitud

    // Verificar que las contraseñas coincidan
    if (contraseña !== confirmarContraseña) {
        return res.status(400).json({ error: 'Las contraseñas no coinciden' });
    }

    try {
        const hashedPassword = await hashPassword(contraseña);
        
        // Crear el objeto userData para pasar al servicio
        const userData = {
            user_type,
            documento_identidad,
            correo,
            contraseña: hashedPassword, // Almacenar la contraseña hasheada
            primer_nombre,
            segundo_nombre,
            primer_apellido,
            segundo_apellido,
        };

        const user = await createUser(userData); // Pasa el objeto completo al servicio
        res.status(201).json({ message: 'Usuario registrado con éxito', user });
    } catch (error) {
        console.error('Error al registrar el usuario:', error); // Log del error completo
        res.status(500).json({ error: 'Error al registrar el usuario', details: error.message });
    }
};

const loginUser = async (req, res) => {
    const { correo, contraseña } = req.body;

    try {
        // Buscar usuario por correo usando Sequelize
        const user = await Usuarios.findOne({ where: { correo } });
        if (!user) {
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }

        // Comparar la contraseña proporcionada con la almacenada
        const isMatch = await comparePassword(contraseña, user.contraseña); // Usa la función comparePassword
        if (!isMatch) {
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }

        // Generar el token JWT
        const token = jwt.generateToken(user.user_id);
        res.status(200).json({ message: 'Login exitoso', token });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

module.exports = { registerUser, loginUser };
