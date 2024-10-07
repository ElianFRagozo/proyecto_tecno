const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints para la autenticación y registro de usuarios
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userType
 *               - documentoIdentidad
 *               - correo
 *               - contraseña
 *               - confirmarContraseña
 *               - primer_nombre
 *               - primer_apellido
 *             properties:
 *               userType:
 *                 type: string
 *                 enum: [empresa, freelancer]
 *                 description: Tipo de usuario
 *               documentoIdentidad:
 *                 type: string
 *                 description: Documento de identidad único
 *               correo:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario
 *               contraseña:
 *                 type: string
 *                 format: password
 *                 description: Contraseña del usuario
 *               confirmarContraseña:
 *                 type: string
 *                 format: password
 *                 description: Confirmación de la contraseña
 *               primer_nombre:
 *                 type: string
 *                 description: Primer nombre del usuario
 *               segundo_nombre:
 *                 type: string
 *                 description: Segundo nombre del usuario (opcional)
 *               primer_apellido:
 *                 type: string
 *                 description: Primer apellido del usuario
 *               segundo_apellido:
 *                 type: string
 *                 description: Segundo apellido del usuario (opcional)
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Solicitud inválida o datos duplicados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.post('/register', registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión de un usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.post('/login', loginUser);

module.exports = router;
