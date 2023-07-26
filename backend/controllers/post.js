//CONTROLEUR FINAL- stocke toute la logique de métier

//importation du modèle d'une post
const Post = require("../models/Post")
const User = require("../models/User")
const Like = require("../models/Like")
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
      : null,
  }

  console.log("log, createPost , reqfile", req.file)

  if (!req.body.content && !req.file) {
    res
      .status(400)
      .json({ error: "Veuillez écrire du contenu ou télécharger une image " })
    return
  }

  const post = new Post({
    ...postObject,
  })
  console.log("log , new post object from createpost function", postObject)
  console.log(
    "log , new post object with image from createpost function",
    postObject.imageUrl
  )

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
    if (req.userData.userId === post.userId || req.userData.role === "admin") {
      let filename
      if (post.imageUrl) {
        filename = post.imageUrl.split("/images/")[1]
      }
      const postObject = req.file
        ? {
            content: req.body.content,
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

      const updatedPost = await Post.findOne({
        where: { postId: req.params.id },
      })

      const { dateUpdated, content, imageUrl, userId, postId } = updatedPost

      res.status(200).json({
        date: dateUpdated,
        content: content,
        imageUrl: imageUrl,
        userId: userId,
        postId: postId,
      })
    } else {
      return res.status(403).json({ error: "Non-autorisé" })
    }
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
    console.log("fonction delete déclenchée")
    const post = await Post.findOne({ where: { postId: req.params.id } })
    console.log("Post found: ", post)
    console.log("post id ", req.params.id)

    if (!post) {
      console.log("Post non trouvé")
      return res.status(404).json({ error: "Post non trouvé" })
    }

    if (!post.content && !post.imageUrl) {
      console.log("erreur : aucun post et aucune image")
      return res
        .status(422)
        .json({ error: "aucun post ni aucune image trouvé" })
    }

    console.log("delete function, req.userData.userId", req.userData.userId)
    console.log("delete function, post.userId", post.userId)
    if (req.userData.userId === post.userId || req.userData.role === "admin") {
      if (post.imageUrl) {
        console.log("suppression post avec image")
        const filename = post.imageUrl.split("/images/")[1]

        fs.unlink(`images/${filename}`, async (err) => {
          if (err) {
            console.error("erreur suppression image: ", err)
            return res.status(500).json({ error: err })
          }

          try {
            await Post.destroy({ where: { postId: req.params.id } })
            console.log("Post & image supprimés !")
            res.status(200).json({ message: "Post & image supprimés !" })
          } catch (error) {
            console.error("Error deleting post: ", error)
            res.status(400).json({ error })
          }
        })
      } else {
        console.log("suppression post sans image ")
        try {
          await Post.destroy({ where: { postId: req.params.id } })
          console.log("Post supprimé")
          res.status(200).json({ message: "Post supprimé !" })
        } catch (error) {
          console.error("Erreur suppression post: ", error)
          res.status(400).json({ error })
        }
      }
    } else {
      console.log("suppression non-autorisé")
      res.status(403).json({ error: "Non-autorisé" })
    }
  } catch (error) {
    console.error("Error in delete process: ", error)
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

//like a post
exports.likePost = async (req, res) => {
  const { userId } = req.userData
  console.log("like function, userId", userId)
  const postId = req.params.id
  console.log("like function , postid", postId)

  const post = await Post.findOne({ where: { postId } })
  console.log("like function, post", post)

  if (!post) {
    res.status(404).json("post non trouvé")
  }

  const like = await Like.findOne({ where: { userId, postId } })

  if (like) {
    //annule le like déjà présent
    await like.destroy()
    res.json({ storedLike: false })
  } else {
    // création d'un like si non existant
    await Like.create({ userId, postId })
    res.json({ storedLike: true })
  }
}

//getLikes
exports.getLikes = async (req, res) => {
  const postId = req.params.id

  try {
    const counter = await Like.count({ where: { postId } })
    res.status(200).json({ counter })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.userHasLiked = async (req, res, next) => {
  const { userId } = req.userData
  console.log("like function, userId", userId)
  const postId = req.params.id
  console.log("like function , postid", postId)

  const like = await Like.findOne({ where: { userId, postId } })

  if (like) {
    res.json({ userHasLiked: false })
  } else {
    res.json({ userHasLiked: true })
  }
}
