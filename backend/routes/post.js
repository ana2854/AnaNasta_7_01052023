//ROUTEUR -logique de rooting

const express = require('express');

//middleware authentification
const auth = require('../middleware/auth')

const multer = require('../middleware/multer-config')

//express.router permet de créer des routeurs séparés pour chaque route ppale de l'appli
const router = express.Router();

const postCtrl = require('../controllers/post');

// ces routes vont appliquer la fonction qui lui est associée
//protection de la route en ajoutant le middleware auth avant d'autoriser l'envoi des requêtes
//multer pour les images 
router.get('/', auth, postCtrl.getAllPosts);
router.post('/', auth, multer, postCtrl.createPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);
//router.post('/:id/like', auth, postCtrl.evaluatePost);

module.exports = router;