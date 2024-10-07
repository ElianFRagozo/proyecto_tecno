const Joi = require('joi');

const validateProfile = (profile) => {
    const schema = Joi.object({
        localizacion: Joi.string().min(3).required(),
        lugar_servicio: Joi.string().min(3).required(),
        disponibilidad: Joi.string().required(),
        moneda_deseada: Joi.string().required(),
        rango_salarial_min: Joi.number().required(),
        rango_salarial_max: Joi.number().required(),
        estudios: Joi.object({
            nivel_estudio: Joi.string().required(),
            institucion: Joi.string().required(),
            ano_inicio: Joi.number().required(),
            ano_fin: Joi.number().required(),
            titulo_obtenido: Joi.string().required(),
        }).required(),
        experiencia: Joi.object({
            funciones_responsabilidades: Joi.string().required(),
            logros: Joi.string().required(),
        }).required(),
        habilidades: Joi.array().items(Joi.string()).required(),
        idiomas: Joi.array().items(
            Joi.object({
                idioma: Joi.string().required(),
                nivel: Joi.string().required(),
            })
        ).required(),
    });
    return schema.validate(profile);
};

module.exports = {
    validateProfile,
};

