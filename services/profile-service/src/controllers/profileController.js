const { sequelize } = require('../config/db'); // Importar la conexión a la base de datos
const { Usuarios, Estudios, ExperienciaLaboral, HabilidadesBlandas, Idiomas } = require('../models');


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
      funciones_responsabilidades: exp.funciones_responsabilidades,
      logros: exp.logros
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
    const user = await Usuarios.findByPkUsuariosUsuarios(userId, {
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

    res.status(200).json(user); // Devolver todos los atributos del usuario y las relaciones
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el perfil", details: error.message });
  }
};

module.exports = {
  createProfile,
  getProfile,
};
