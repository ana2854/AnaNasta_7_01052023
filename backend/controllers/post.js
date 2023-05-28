//CONTROLEUR FINAL- stocke toute la logique de métier

//importation du modèle d'une post
const Post = require("../models/Post");

//importation du package fs de node
const fs = require("fs");

exports.createPost = (req, res, next) => {
  console.log(req.body.post);
  const postObject = JSON.parse(req.body.post);
  delete postObject._id;
  const post = new Post({
    ...postObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  post
    .save()
    .then(() => res.status(201).json({ message: "Post crée !" }))
    .catch((error) => {
      console.log(error);

      res.status(400).json({ error });
    });
};

//route pour récupérer une post
exports.getOnePost = (req, res, next) => {
  Post.findOne({
    _id: req.params.id,
  })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

//route pour modifier une post

exports.modifyPost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      const filename = post.imageUrl.split("/images/")[1]; 
      fs.unlink(`images/${filename}`, () => {
        const postObject = req.file
          ? {
              ...JSON.parse(req.body.post),
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
              }`,
            }
          : { ...req.body };
        Post.updateOne(
          { _id: req.params.id },
          { ...postObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Post modifiée !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

//route pour supprimer une post
exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      const filename = post.imageUrl.split("/images/")[1];
      //fonction callback - agit qd action précédente terminée
      fs.unlink(`images/${filename}`, () => {
        Post.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Post supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

//route pour récupérer toutes les posts
exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.evaluatePost = (req, res, next) => {
  if (req.body.like === 1) {
    // si l'utilisateur aime la post //
    Post.updateOne(
      { _id: req.params.id },
      {
        $inc: { likes: req.body.like++ },
        $push: { usersLiked: req.body.userId },
      }
    ) // on ajoute 1 like et on le push l'array usersLiked //
      .then((post) => res.status(200).json({ message: "Like" }))
      .catch((error) => res.status(400).json({ error }));
  } else if (req.body.like === -1) {
    // sinon si il aime pas la post //
    Post.updateOne(
      { _id: req.params.id },
      {
        $inc: { dislikes: req.body.like++ * -1 },
        $push: { usersDisliked: req.body.userId },
      }
    ) // on ajoute 1 dislike et on le push l'array usersDisliked //
      .then((post) => res.status(200).json({ message: "Dislike" }))
      .catch((error) => res.status(400).json({ error }));
  } else {
    // si l'utilisateur enleve son like
    Post.findOne({ _id: req.params.id })
      .then((post) => {
        if (post.usersLiked.includes(req.body.userId)) {
          // si l'array userLiked contient le id de like //
          Post.updateOne(
            { _id: req.params.id },
            { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }
          ) // $pull : ça vide l'array userLiked et ça enleve un like sinon le meme utilisateur pourrai ajouter plusieurs like//
            .then((post) => {
              res.status(200).json({ message: "Annulation du Like !" });
            })
            .catch((error) => res.status(400).json({ error }));
        } else if (post.usersDisliked.includes(req.body.userId)) {
          //// si l'array userDisliked contient le id de like //
          Post.updateOne(
            { _id: req.params.id },
            {
              $pull: { usersDisliked: req.body.userId },
              $inc: { dislikes: -1 },
            }
          ) // $pull : ça vide l'array userDisliked et ça enleve un like sinon le meme utilisateur pourrai ajouter plusieurs like//
            .then((post) => {
              res.status(200).json({ message: "Annulation du Dislike !" });
            })
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(400).json({ error }));
  }
};