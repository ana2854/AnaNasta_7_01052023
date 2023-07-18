//importation du package multer
const multer = require("multer")
// package qui gère les fichier multipart/form-data

//objet dictionnaire appelé mime type et traduit les extensions reçues
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
}

//objet de configuration pour multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images")
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(".")[0]
    const extension = MIME_TYPES[file.mimetype]
    const timestamp = Date.now()
    const filename = `${name}_${timestamp}.${extension}`
    callback(null, filename)
  },
})

module.exports = multer({ storage: storage }).single("imageUrl")
