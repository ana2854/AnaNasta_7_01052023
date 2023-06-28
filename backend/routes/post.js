//ROUTEUR -logique de rooting
const express = require('express');

//middleware authentification
const auth = require('../middleware/auth')

const multer = require('../middleware/multer-config')

//express.router permet de créer des routeurs séparés pour chaque route ppale de l'appli
const router = express.Router();

const postCtrl = require('../controllers/post');
const { adminCheck } = require('../middleware/adminCheck');


/*
// ces routes vont appliquer la fonction qui lui est associée
//protection de la route en ajoutant le middleware auth avant d'autoriser l'envoi des requêtes
//multer pour les images 

router.post('/', auth, multer, postCtrl.createPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.get('/', auth, postCtrl.getAllPosts);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);
//router.post('/:id/like', auth, postCtrl.evaluatePost);
*/

router.post('/', auth, multer, (req, res, next) => {
    console.log('route création post');
    postCtrl.createPost(req, res, next);
  });

  router.get('/latest', auth, (req, res, next) => {
    console.log('accès aux posts les plus récents');
    postCtrl.getLatestPosts(req, res, next);
  });


router.put('/:id', auth, adminCheck, multer, (req, res, next) => {
    console.log('Modifier un post');
    postCtrl.modifyPost(req, res, next);
  });


router.get('/:id', auth, (req, res, next) => {
    console.log('route accès à un post');
    postCtrl.getOnePost(req, res, next);
  });
  
  router.get('/', auth, (req, res, next) => {
    console.log('accéder aux posts des users');
    postCtrl.getAllPosts(req, res, next);
  });
  
  
  router.delete('/:id', auth, adminCheck, (req, res, next) => {
    console.log('Supprimer un post');
    postCtrl.deletePost(req, res, next);
  });

 

module.exports = router;