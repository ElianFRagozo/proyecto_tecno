const bcrypt = require('bcrypt');

// Función para hashear la contraseña
const hashPassword = async (password) => {
    try {
        const saltRounds = 10; // Número de rondas para generar el salt
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error al hashear la contraseña');
    }
};

// Función para comparar la contraseña en texto plano con el hash almacenado
const comparePassword = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        throw new Error('Error al comparar la contraseña');
    }
};

module.exports = {
    hashPassword,
    comparePassword
};
