const express = require("express");
const {
  registrarEmpresa,
  obtenerEmpresa,
  actualizarEmpresa,
} = require("../controllers/profileController"); // Ajusta el path según sea necesario
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Perfiles
 *   description: Gestión de perfiles de usuario
 */

/**
 * @swagger
 * /perfiles/crear:
 *   post:
 *     summary: Crear un perfil de usuario
 *     tags: [Perfiles]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID del usuario
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
 *                 type: number
 *                 description: Rango salarial mínimo
 *               rango_salarial_max:
 *                 type: number
 *                 description: Rango salarial máximo
 *               estudios:
 *                 type: string
 *                 description: JSON con los datos de estudios
 *               experiencia:
 *                 type: string
 *                 description: JSON con los datos de experiencia laboral
 *               habilidades:
 *                 type: string
 *                 description: JSON con las habilidades blandas
 *               idiomas:
 *                 type: string
 *                 description: JSON con los idiomas
 *               foto:
 *                 type: string
 *                 format: binary
 *                 description: Foto del usuario
 *               hoja_de_vida:
 *                 type: string
 *                 format: binary
 *                 description: Hoja de vida del usuario
 *     responses:
 *       201:
 *         description: Perfil creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error al crear el perfil
 */
router.post("/crear", registrarEmpresa);

/**
 * @swagger
 * /perfiles/{id}:
 *   get:
 *     summary: Obtener un perfil de usuario
 *     tags: [Perfiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Perfil del usuario
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al obtener el perfil
 */
router.get("/:id", obtenerEmpresa);

/**
 * @swagger
 * /perfiles/{id}:
 *   put:
 *     summary: Actualizar un perfil de usuario
 *     tags: [Perfiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               localizacion:
 *                 type: string
 *               lugar_servicio:
 *                 type: string
 *               disponibilidad:
 *                 type: string
 *               moneda_deseada:
 *                 type: string
 *               rango_salarial_min:
 *                 type: number
 *               rango_salarial_max:
 *                 type: number
 *               estudios:
 *                 type: string
 *                 description: JSON con los datos de estudios
 *               experiencia:
 *                 type: string
 *                 description: JSON con los datos de experiencia laboral
 *               habilidades:
 *                 type: string
 *                 description: JSON con las habilidades blandas
 *               idiomas:
 *                 type: string
 *                 description: JSON con los idiomas
 *               foto:
 *                 type: string
 *                 format: binary
 *               hoja_de_vida:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Perfil actualizado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al actualizar el perfil
 */
router.put("/:id", actualizarEmpresa);

module.exports = router;
