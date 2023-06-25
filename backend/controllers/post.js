//CONTROLEUR FINAL- stocke toute la logique de métier

//importation du modèle d'une post
const Post = require("../models/Post")
const fs = require("fs")
const path = require("path")

exports.createPost = (req, res, next) => {
  console.log(req.body.content)
  console.log("post crée")

  const postObject = {
    ...req.body,
    userId: req.body.userId,
  }
  console.log("postObject de ma fonction créer post", postObject)
  console.log(
    "userId from my post object from my create function",
    postObject.userId
  )

  const image = req.file
    ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    : null

  const post = new Post({
    ...postObject,
    imageUrl: image,
  })
  console.log("new post object from login function", postObject)

  post
    .save()
    .then((savedPost) => {
      const { dateCreated, content, imageUrl, userId } = savedPost

      res.status(201).json({
        date: dateCreated,
        content: content,
        image: imageUrl,
        userId: userId,
      })
    })
    .catch((error) => {
      console.log(error)

      res.status(400).json({ error })
    })
}

//route pour récupérer une post
exports.getOnePost = (req, res, next) => {
  Post.findOne({
    where: { postId: req.params.id },
  })
    .then((post) => {
      res.status(200).json(post)
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      })
    })
}

//route modification post
exports.modifyPost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { postId: req.params.id } })

    let filename
    if (post.imageUrl) {
      filename = post.imageUrl.split("/images/")[1]
    }
    const postObject = req.file
      ? {
          ...req.body.content,
          imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        }
      : { ...req.body }

    await Post.update(postObject, { where: { postId: req.params.id } })

    if (req.file && filename) {

      const filePath = path.join("images", filename)

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("erreur suppression ancienne image", err)
        } else {
          console.log(`ancienne image supprimée: ${filePath}`)
        }
      })
    }

    res.status(200).json({ message: "Post modifié !" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
}

//route pour supprimer une post
exports.deletePost = (req, res, next) => {
  //if (permissions.isAdmin(req) || permissions.isPostOwner(req))
  Post.findOne({ where: { postId: req.params.id } })
    .then((post) => {
      if (post.imageUrl) {
        const filename = post.imageUrl.split("/images/")[1]

        fs.unlink(`images/${filename}`, () => {
          Post.destroy({ where: { postId: req.params.id } })
            .then(() =>
              res.status(200).json({ message: "Post & image supprimés !" })
            )
            .catch((error) => res.status(400).json({ error }))
        })
      } else {
        Post.destroy({ where: { postId: req.params.id } })
          .then(() => res.status(200).json({ message: "Post supprimé !" }))
          .catch((error) => res.status(400).json({ error }))
      }
    })
    .catch((error) => res.status(500).json({ error }))
}

//route pour récupérer toutes les posts
exports.getAllPosts = (req, res, next) => {
  Post.findAll()
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      })
    })
}

/*
exports.evaluatePost = (req, res, next) => {
  if (req.body.likes === 1) {
    // si l'utilisateur aime la post //
    Post.update(
      { where : {postId: req.params.postId }},
      {
        $inc: { likes: req.body.likes++ },
        $push: { usersLikes: req.body.userId },
      }
    ) // on ajoute 1 like et on le push l'array usersLiked //
      .then((post) => res.status(200).json({ message: "Like" }))
      .catch((error) => res.status(400).json({ error }))
  } else if (req.body.likes === -1) {
    // sinon si il aime pas la post //
    Post.update(
      { id: req.params.postId },
      {
        $inc: { dislikes: req.body.likes++ * -1 },
        $push: { usersDislikes: req.body.userId },
      }
    ) // on ajoute 1 dislike et on le push l'array usersDisliked //
      .then((post) => res.status(200).json({ message: "Dislike" }))
      .catch((error) => res.status(400).json({ error }))
  } else {
    // si l'utilisateur enleve son like
    Post.findOne({ id: req.params.postId })
      .then((post) => {
        if (post.usersLikes.includes(req.body.userId)) {
          // si l'array userLiked contient le id de like //
          Post.update(
            { id: req.params.postId },
            { $pull: { usersLikes: req.body.userId }, $inc: { likes: -1 } }
          ) // $pull : ça vide l'array userLiked et ça enleve un like sinon le meme utilisateur pourrai ajouter plusieurs like//
            .then((post) => {
              res.status(200).json({ message: "Annulation du Like !" })
            })
            .catch((error) => res.status(400).json({ error }))
        } else if (post.usersDislikes.includes(req.body.userId)) {
          //// si l'array userDisliked contient le id de like //
          Post.update(
            { id: req.params.postId },
            {
              $pull: { usersDislikes: req.body.userId },
              $inc: { dislikes: -1 },
            }
          ) // $pull : vide l'array userDisliked et ça enleve un like sinon le meme utilisateur pourrai ajouter plusieurs like//
            .then((post) => {
              res.status(200).json({ message: "Annulation du Dislike !" })
            })
            .catch((error) => res.status(400).json({ error }))
        }
      })
      .catch((error) => res.status(400).json({ error }))
  }
}
*/
