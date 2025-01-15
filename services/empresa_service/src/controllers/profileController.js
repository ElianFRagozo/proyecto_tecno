const { sequelize } = require('../config/db'); // Conexión a la base de datos
const { Empresa } = require('../models'); // Suponiendo que tienes un modelo `Empresa`
const { validationResult } = require('express-validator'); // Para validar datos
const router = require('express').Router();

// Crear una empresa
const registrarEmpresa = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const {
      nombres,
      apellidos,
      tipoDocumento,
      numeroDocumento,
      anoNacimiento,
      cargo,
      razonSocial,
      nit,
      sector,
      telefono,
    } = req.body;

    // Validar errores de los datos enviados
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }

    // Crear empresa en la base de datos
    const nuevaEmpresa = await Empresa.create(
      {
        representante: {
          nombres,
          apellidos,
          tipoDocumento,
          numeroDocumento,
          anoNacimiento,
          cargo,
        },
        razonSocial,
        nit,
        sector,
        telefono,
      },
      { transaction }
    );

    await transaction.commit();
    res.status(201).json({
      mensaje: 'Empresa registrada exitosamente.',
      datos: nuevaEmpresa,
    });
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar la empresa.', detalles: error.message });
  }
};

// Obtener una empresa por su ID
const obtenerEmpresa = async (req, res) => {
  try {
    const { id } = req.params;

    const empresa = await Empresa.findByPk(id);

    if (!empresa) {
      return res.status(404).json({ mensaje: 'Empresa no encontrada.' });
    }

    res.status(200).json(empresa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener la empresa.', detalles: error.message });
  }
};

// Actualizar una empresa
const actualizarEmpresa = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;
    const updates = req.body;

    // Buscar empresa por ID
    const empresa = await Empresa.findByPk(id);

    if (!empresa) {
      return res.status(404).json({ mensaje: 'Empresa no encontrada.' });
    }

    // Validar datos
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }

    // Actualizar datos
    await empresa.update(updates, { transaction });

    await transaction.commit();
    res.status(200).json({ mensaje: 'Empresa actualizada exitosamente.', datos: empresa });
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar la empresa.', detalles: error.message });
  }
};

// Rutas
router.post('/registrar', registrarEmpresa);
router.get('/:id', obtenerEmpresa); // Ruta para obtener una empresa por ID
router.put('/:id', actualizarEmpresa); // Ruta para actualizar una empresa

module.exports = { registrarEmpresa, obtenerEmpresa, actualizarEmpresa };

