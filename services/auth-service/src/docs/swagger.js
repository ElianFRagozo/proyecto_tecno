// src/docs/swagger.js

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Auth Service API',
            version: '1.0.0',
            description: 'API para el Servicio de Autenticación y Registro de Usuarios',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 4000}`,
                description: 'Servidor de Desarrollo',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                RegisterRequest: {
                    type: 'object',
                    required: [
                        'userType', 
                        'documentoIdentidad', 
                        'correo', 
                        'contraseña', 
                        'confirmarContraseña', 
                        'primer_nombre', 
                        'primer_apellido'
                    ],
                    properties: {
                        userType: {
                            type: 'string',
                            enum: ['empresa', 'freelancer'],
                            description: 'Tipo de usuario',
                        },
                        documentoIdentidad: {
                            type: 'string',
                            description: 'Documento de identidad único',
                        },
                        correo: {
                            type: 'string',
                            format: 'email',
                            description: 'Correo electrónico del usuario',
                        },
                        contraseña: {
                            type: 'string',
                            format: 'password',
                            description: 'Contraseña del usuario',
                        },
                        confirmarContraseña: {
                            type: 'string',
                            format: 'password',
                            description: 'Confirmación de la contraseña',
                        },
                        primer_nombre: {
                            type: 'string',
                            description: 'Primer nombre del usuario',
                        },
                        segundo_nombre: {
                            type: 'string',
                            description: 'Segundo nombre del usuario',
                        },
                        primer_apellido: {
                            type: 'string',
                            description: 'Primer apellido del usuario',
                        },
                        segundo_apellido: {
                            type: 'string',
                            description: 'Segundo apellido del usuario',
                        },
                    },
                },
                LoginRequest: {
                    type: 'object',
                    required: ['correo', 'contraseña'],
                    properties: {
                        correo: {
                            type: 'string',
                            format: 'email',
                            description: 'Correo electrónico del usuario',
                        },
                        contraseña: {
                            type: 'string',
                            format: 'password',
                            description: 'Contraseña del usuario',
                        },
                    },
                },
                UserResponse: {
                    type: 'object',
                    properties: {
                        user_id: {
                            type: 'integer',
                            description: 'ID del usuario',
                        },
                    },
                },
                AuthResponse: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                        },
                        token: {
                            type: 'string',
                            description: 'Token JWT para autenticación',
                        },
                    },
                },
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        error: {
                            type: 'string',
                        },
                    },
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

module.exports = setupSwagger;
