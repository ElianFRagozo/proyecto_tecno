const { sequelize } = require('../config/db');

// Importar modelos
const Usuarios = require('./Usuarios');
const Estudios = require('./Estudios');
const ExperienciaLaboral = require('./ExperienciaLaboral');
const HabilidadesBlandas = require('./HabilidadesBlandas');
const Idiomas = require('./Idiomas');

// Definir asociaciones
Usuarios.hasMany(Estudios, { foreignKey: 'user_id' });
Estudios.belongsTo(Usuarios, { foreignKey: 'user_id' });

Usuarios.hasMany(ExperienciaLaboral, { foreignKey: 'user_id' });
ExperienciaLaboral.belongsTo(Usuarios, { foreignKey: 'user_id' });

Usuarios.hasMany(HabilidadesBlandas, { foreignKey: 'user_id' });
HabilidadesBlandas.belongsTo(Usuarios, { foreignKey: 'user_id' });

Usuarios.hasMany(Idiomas, { foreignKey: 'user_id' });
Idiomas.belongsTo(Usuarios, { foreignKey: 'user_id' });

// Exportar modelos y sequelize
module.exports = {
  sequelize,
  Usuarios,
  Estudios,
  ExperienciaLaboral,
  HabilidadesBlandas,
  Idiomas
};