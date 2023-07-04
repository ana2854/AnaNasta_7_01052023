//CONTROLEUR FINAL- stocke toute la logique de métier

//importation du modèle d'une post
const Post = require("../models/Post")
const User = require("../models/User")
const fs = require("fs")
const path = require("path")

//création post
exports.createPost = (req, res, next) => {
  console.log("function createPost, req.body.content", req.body.content)
  console.log("function createPost, req.body", req.body)
  console.log("post crée")

  const postObject = {
    ...req.body,
    userId: req.userData.userId,
    imageUrl: req.file
    ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    : null
  }

    console.log("log, createPost , reqfile", req.file)

  if (!req.body.content && !req.file) {
    res
      .status(400)
      .json({ error: "Veuillez écrire du contenu ou télécharger une image " })
    return
  }

  const post = new Post({
    ...postObject
  })
  console.log("log , new post object from createpost function", postObject)
  console.log("log , new post object with image from createpost function", postObject.imageUrl)


  post
    .save()
    .then((savedPost) => {
      const { dateCreated, content, imageUrl, userId, postId } = savedPost

      res.status(201).json({
        date: dateCreated,
        content: content,
        imageUrl: imageUrl,
        userId: userId,
        postId: postId,
      })
    })
    .catch((error) => {
      console.log(error)
      res.status(400).json({ error })
    })
}



//route modification post
exports.modifyPost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { postId: req.params.id } })

    if (req.userData.userId !== post.userId && req.userData.role !== "admin") {
      return res.status(403).json({ error: "Non-autorisé" })
    }

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

//accès à un post
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

//accès aux posts
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

//posts les plus récents
exports.getLatestPosts = (req, res, next) => {
  Post.findAll({
    order: [["dateCreated", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["email", "userId"],
      },
    ],
  })
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      })
    })
}

exports.deletePost = async (req, res, next) => {
  try {
    console.log("Starting delete process");
    const post = await Post.findOne({ where: { postId: req.params.id } })
    console.log("Post found: ", post);
    console.log("post id ", req.params.id)

    if (!post) {
      console.log('Post not found');
      return res.status(404).json({ error: 'Post not found' });
  }
  
  if (!post.content && !post.imageUrl) {
      console.log('Neither post content nor image found');
      return res.status(422).json({ error: 'Neither post content nor image found' });
  }

   console.log("delete function, req.userData.userId", req.userData.userId);
   console.log("delete function, post.userId",post.userId);
    if (req.userData.userId === post.userId || req.userData.role === "admin") {
      if (post.imageUrl) {
        console.log("Deleting post with image");
        const filename = post.imageUrl.split("/images/")[1]

        fs.unlink(`images/${filename}`, async (err) => {
          if (err) {
            console.error("Error deleting image file: ", err);
            return res.status(500).json({ error: err });
          }

          try {
            await Post.destroy({ where: { postId: req.params.id } })
            console.log("Post and image deleted");
            res.status(200).json({ message: "Post & image supprimés !" })
          } catch (error) {
            console.error("Error deleting post: ", error);
            res.status(400).json({ error })
          }
        })
      } else {
        console.log("Deleting post without image");
        try {
          await Post.destroy({ where: { postId: req.params.id } })
          console.log("Post deleted");
          res.status(200).json({ message: "Post supprimé !" })
        } catch (error) {
          console.error("Error deleting post: ", error);
          res.status(400).json({ error })
        }
      }
    } else {
      console.log("Unauthorized delete attempt");
      res.status(403).json({ error: "Non-autorisé" })
    }
  } catch (error) {
    console.error("Error in delete process: ", error);
    res.status(500).json({ error })
  }
}


//accès aux post d'un utilisateur
exports.getUserPosts = (req, res, next) => {
  const userId = req.params.userId
  Post.findAll({
    where: { userId },
    order: [["dateCreated", "DESC"]],
  })
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch((error) => {
      res.status(400).json({ error })
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
