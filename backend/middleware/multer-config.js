

//importation du package multer
const multer = require ('multer');
// This line imports the Multer package, which is a middleware for handling multipart/form-data, primarily used for uploading files.

//objet dictionnaire appelé mime type et traduit les extensions reçues
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg':'jpg',
    'image/png': 'png'
}

//objet de configuration pour multer
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename : (req, file, callback) => {
        const name = file.originalname.split('.')[0]; 
        const extension = MIME_TYPES[file.mimetype];
        const timestamp = Date.now();
        const filename = `${name}_${timestamp}.${extension}`;
        callback(null, filename);
    }
});


module.exports = multer({ storage: storage }).single('imageUrl');




