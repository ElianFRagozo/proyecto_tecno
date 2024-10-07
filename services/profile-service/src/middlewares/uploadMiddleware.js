const multer = require('multer');

// Configuración del almacenamiento
const storage = multer.memoryStorage(); // Almacena el archivo en memoria

// Configuración de multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limite de tamaño de archivo (5 MB)
    fileFilter: (req, file, cb) => {
        // Aceptar solo ciertos tipos de archivos, por ejemplo, imágenes y PDFs
        const filetypes = /jpeg|jpg|png|pdf/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(file.originalname.split('.').pop().toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Archivo no válido. Debe ser una imagen o un PDF.');
        }
    },
});

// Exporta el middleware
module.exports = upload;
