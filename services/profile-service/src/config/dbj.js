const Usuario = require('./models/Usuario');
const Estudio = require('./models/Estudio');
const ExperienciaLaboral = require('./models/ExperienciaLaboral');
const HabilidadBlanda = require('./models/HabilidadBlanda');
const Idioma = require('./models/Idioma');

// Relaciones
Usuario.hasMany(Estudio, { foreignKey: 'user_id' });
Usuario.hasMany(ExperienciaLaboral, { foreignKey: 'user_id' });
Usuario.hasMany(HabilidadBlanda, { foreignKey: 'user_id' });
Usuario.hasMany(Idioma, { foreignKey: 'user_id' });

Estudio.belongsTo(Usuario, { foreignKey: 'user_id' });
ExperienciaLaboral.belongsTo(Usuario, { foreignKey: 'user_id' });
HabilidadBlanda.belongsTo(Usuario, { foreignKey: 'user_id' });
Idioma.belongsTo(Usuario, { foreignKey: 'user_id' });

module.exports = {
    Usuario,
    Estudio,
    ExperienciaLaboral,
    HabilidadBlanda,
    Idioma
};
