//ROUTEUR -logique de rooting
const express = require('express');

//middleware authentification
const auth = require('../middleware/auth')

const multer = require('../middleware/multer-config')

//express.router permet de créer des routeurs séparés pour chaque route ppale de l'appli
const router = express.Router();

const postCtrl = require('../controllers/post');
const { adminCheck } = require('../middleware/adminCheck');




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

  router.get('/profile/:userId', auth, (req,res,next)=> {
    console.log("accès aux posts d'un user specifique");
    postCtrl.getUserPosts(req, res, next);
  })

 

module.exports = router;