const express = require("express");
const {
    createProfile,
    getProfile,
} = require("../controllers/profileController");
const upload = require("../middlewares/uploadMiddleware"); // Importa el middleware de multer
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Profiles
 *   description: Gestión de perfiles
 */

/**
 * @swagger
 * /profiles:
 *   post:
 *     summary: Crea un nuevo perfil para un usuario existente
 *     tags: [Profiles]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: ID del usuario al que se le va a agregar el perfil
 *               foto:
 *                 type: string
 *                 format: binary
 *                 description: Imagen de perfil
 *               hoja_de_vida:
 *                 type: string
 *                 format: binary
 *                 description: Documento PDF de la hoja de vida
 *               localizacion:
 *                 type: string
 *                 description: Localización del usuario
 *               lugar_servicio:
 *                 type: string
 *                 description: Lugar de servicio
 *               disponibilidad:
 *                 type: string
 *                 description: Disponibilidad del usuario
 *               moneda_deseada:
 *                 type: string
 *                 description: Moneda deseada
 *               rango_salarial_min:
 *                 type: integer
 *                 description: Rango salarial mínimo
 *               rango_salarial_max:
 *                 type: integer
 *                 description: Rango salarial máximo
 *               estudios:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nivel_estudio:
 *                       type: string
 *                       description: Nivel de estudio
 *                     institucion:
 *                       type: string
 *                       description: Institución educativa
 *                     ano_inicio:
 *                       type: integer
 *                       description: Año de inicio
 *                     ano_fin:
 *                       type: integer
 *                       description: Año de finalización
 *                     titulo_obtenido:
 *                       type: string
 *                       description: Título obtenido
 *               experiencia:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     funciones_responsabilidades:
 *                       type: string
 *                       description: Funciones y responsabilidades
 *                     logros:
 *                       type: string
 *                       description: Logros obtenidos
 *               habilidades:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     habilidad:
 *                       type: string
 *                       description: Habilidad
 *               idiomas:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     idioma:
 *                       type: string
 *                       description: Idioma
 *                     nivel:
 *                       type: string
 *                       description: Nivel del idioma
 *     responses:
 *       201:
 *         description: Perfil creado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en la creación del perfil
 */
router.post(
    "/",
    upload.fields([
        { name: "foto", maxCount: 1 },
        { name: "hoja_de_vida", maxCount: 1 },
    ]),
    createProfile
);

/**
 * @swagger
 * /profiles/{id}:
 *   get:
 *     summary: Obtiene un perfil por ID
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Perfil obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     foto:
 *                       type: string
 *                       format: base64
 *                       description: Foto del usuario en formato Base64
 *                     hoja_de_vida:
 *                       type: string
 *                       format: base64
 *                       description: Hoja de vida del usuario en formato Base64
 *                     localizacion:
 *                       type: string
 *                     lugar_servicio:
 *                       type: string
 *                     disponibilidad:
 *                       type: string
 *                     moneda_deseada:
 *                       type: string
 *                     rango_salarial_min:
 *                       type: integer
 *                     rango_salarial_max:
 *                       type: integer
 *                 estudios:
 *                   type: array
 *                   description: Lista de estudios del usuario
 *                   items:
 *                     type: object
 *                     properties:
 *                       nivel_estudio:
 *                         type: string
 *                       institucion:
 *                         type: string
 *                       ano_inicio:
 *                         type: integer
 *                       ano_fin:
 *                         type: integer
 *                       titulo_obtenido:
 *                         type: string
 *                 experiencia:
 *                   type: array
 *                   description: Lista de experiencia laboral del usuario
 *                   items:
 *                     type: object
 *                     properties:
 *                       funciones_responsabilidades:
 *                         type: string
 *                       logros:
 *                         type: string
 *                 habilidades:
 *                   type: array
 *                   description: Lista de habilidades del usuario
 *                   items:
 *                     type: string
 *                 idiomas:
 *                   type: array
 *                   description: Lista de idiomas que habla el usuario
 *                   items:
 *                     type: object
 *                     properties:
 *                       idioma:
 *                         type: string
 *                       nivel:
 *                         type: string
 *       404:
 *         description: Perfil no encontrado
 *       500:
 *         description: Error al obtener el perfil
 */
router.get("/:id", getProfile);

module.exports = router;
