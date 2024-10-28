const { sequelize } = require('../config/db'); // Importar la conexión a la base de datos
const { Usuarios, Estudios, ExperienciaLaboral, HabilidadesBlandas, Idiomas } = require('../models');
const moment = require('moment');

// Crear perfil
const createProfile = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const {
      userId,
      localizacion,
      lugar_servicio,
      disponibilidad,
      moneda_deseada,
      rango_salarial_min,
      rango_salarial_max,
      estudios,
      experiencia,
      habilidades,
      idiomas
    } = req.body;

    let estudiosParsed, experienciaParsed, idiomasParsed, habilidadParsed;

    // Parsear y validar los datos
    try {
      estudiosParsed = JSON.parse(estudios);
      experienciaParsed = JSON.parse(experiencia);
      idiomasParsed = JSON.parse(idiomas);
      habilidadParsed = JSON.parse(habilidades);

      // Validar fechas de experiencia laboral
      experienciaParsed.forEach(exp => {
        if (!moment(exp.fecha_inicio, 'YYYY-MM-DD', true).isValid()) {
          throw new Error(`La fecha de inicio ${exp.fecha_inicio} no es válida para la experiencia con la empresa ${exp.nombre_empresa}.`);
        }
      });
    } catch (error) {
      return res.status(400).json({ error: "Formato inválido en los datos", details: error.message });
    }

    // Verificar que el usuario exista
    const usuario = await Usuarios.findByPk(userId);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Actualizar el usuario
    await Usuarios.update({
      localizacion,
      lugar_servicio,
      disponibilidad,
      moneda_deseada,
      rango_salarial_min,
      rango_salarial_max,
      foto: req.files.foto[0].buffer, // Guardar buffer de la imagen
      hoja_de_vida: req.files.hoja_de_vida[0].buffer,
    }, {
      where: { user_id: userId },
      transaction
    });

    // Insertar los estudios, experiencia, habilidades e idiomas
    await Estudios.bulkCreate(estudiosParsed.map(estudio => ({
      user_id: userId,
      nivel_estudio: estudio.nivel_estudio,
      institucion: estudio.institucion,
      ano_inicio: estudio.ano_inicio,
      ano_fin: estudio.ano_fin,
      titulo_obtenido: estudio.titulo_obtenido
    })), { transaction });

    await ExperienciaLaboral.bulkCreate(experienciaParsed.map(exp => ({
      user_id: userId,
      nombre_empresa: exp.nombre_empresa,
      cargo: exp.cargo,
      fecha_inicio: exp.fecha_inicio,
      otro_cargo: exp.otro_cargo || null,
      fecha_fin: exp.fecha_fin || null,
      actualmente: exp.actualmente || false,
      funciones_responsabilidades: exp.funciones_responsabilidades || null,
      logros: exp.logros || null
    })), { transaction });

    await HabilidadesBlandas.bulkCreate(habilidadParsed.map(habilidad => ({
      user_id: userId,
      habilidad: habilidad.habilidad
    })), { transaction });

    await Idiomas.bulkCreate(idiomasParsed.map(idioma => ({
      user_id: userId,
      idioma: idioma.idioma,
      nivel: idioma.nivel
    })), { transaction });

    await transaction.commit();
    res.status(201).json({ message: "Perfil creado exitosamente" });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: "Error al crear el perfil", details: error.message });
  }
};

// Obtener perfil
const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    // Obtener el usuario y todas las relaciones
    const user = await Usuarios.findByPk(userId, {
      include: [
        { model: Estudios }, // Relación con estudios
        { model: ExperienciaLaboral }, // Relación con experiencia laboral
        { model: HabilidadesBlandas }, // Relación con habilidades blandas
        { model: Idiomas } // Relación con idiomas
      ]
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json(user.toJSON()); // Devolver todos los atributos del usuario y las relaciones
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el perfil", details: error.message });
  }
};

const updateProfile = async (req, res) => {
  const userId = req.params.id; // Obtiene el ID del perfil a actualizar
  const updates = req.body; // Obtiene los datos del cuerpo de la solicitud

  try {
      // Busca el perfil del usuario en la base de datos
      const userProfile = await Usuarios.findOne({ where: { user_id: userId } });
      
      // Verifica si el usuario existe
      if (!userProfile) {
          return res.status(404).json({ error: "Usuario no encontrado" });
      }

      // Validaciones adicionales para los datos en `updates`
      if (updates.localizacion && updates.localizacion.trim() === "") {
          return res.status(400).json({ error: "La localización no puede estar vacía" });
      }

      // Parsear los campos que llegan como cadenas JSON
      if (updates.estudios) {
          updates.estudios = JSON.parse(updates.estudios);
      }

      if (updates.experiencia) {
          updates.experiencia = JSON.parse(updates.experiencia);
      }

      if (updates.habilidades) {
          updates.habilidades = JSON.parse(updates.habilidades);
      }

      if (updates.idiomas) {
          updates.idiomas = JSON.parse(updates.idiomas);
      }

      // Actualiza los campos necesarios
      await userProfile.update({
          localizacion: updates.localizacion,
          lugar_servicio: updates.lugar_servicio,
          disponibilidad: updates.disponibilidad,
          moneda_deseada: updates.moneda_deseada,
          rango_salarial_min: updates.rango_salarial_min,
          rango_salarial_max: updates.rango_salarial_max,
          foto: req.files.foto ? req.files.foto[0].buffer : userProfile.foto, // Actualizar solo si hay una nueva foto
          hoja_de_vida: req.files.hoja_de_vida ? req.files.hoja_de_vida[0].buffer : userProfile.hoja_de_vida,
      });

      // Eliminar los registros existentes y crear nuevos
      await Estudios.destroy({ where: { user_id: userId } });
      await Estudios.bulkCreate(updates.estudios.map(estudio => ({
          user_id: userId,
          nivel_estudio: estudio.nivel_estudio,
          institucion: estudio.institucion,
          ano_inicio: estudio.ano_inicio,
          ano_fin: estudio.ano_fin,
          titulo_obtenido: estudio.titulo_obtenido
      })));

      await ExperienciaLaboral.destroy({ where: { user_id: userId } });
      await ExperienciaLaboral.bulkCreate(updates.experiencia.map(exp => ({
          user_id: userId,
          nombre_empresa: exp.nombre_empresa,
          cargo: exp.cargo,
          fecha_inicio: exp.fecha_inicio,
          otro_cargo: exp.otro_cargo || null,
          fecha_fin: exp.fecha_fin || null,
          actualmente: exp.actualmente || false,
          funciones_responsabilidades: exp.funciones_responsabilidades || null,
          logros: exp.logros || null
      })));

      await HabilidadesBlandas.destroy({ where: { user_id: userId } });
      await HabilidadesBlandas.bulkCreate(updates.habilidades.map(habilidad => ({
          user_id: userId,
          habilidad: habilidad.habilidad
      })));

      await Idiomas.destroy({ where: { user_id: userId } });
      await Idiomas.bulkCreate(updates.idiomas.map(idioma => ({
          user_id: userId,
          idioma: idioma.idioma,
          nivel: idioma.nivel
      })));

      res.status(200).json({ message: "Perfil actualizado exitosamente" });
  } catch (error) {
      console.error(error); // Loguea el error para depuración
      res.status(500).json({ error: "Error al actualizar el perfil", details: error.message });
  }
};

module.exports = {
  createProfile,
  getProfile,
  updateProfile, // Exportar la nueva función
};
