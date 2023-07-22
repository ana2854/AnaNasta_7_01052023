//post seul en entier + comm
import { useNavigate, useLoaderData } from "react-router-dom"
import { getLikes, getOnePost, likePost, userHasLiked } from "../api/posts"
import { getOneUser } from "../api/user"
import { Link } from "react-router-dom"
import { getItem } from "../utils/LocalStorage"
import { deletePost } from "../api/posts"
import { useEffect, useState } from "react"
import { FaThumbsUp } from "react-icons/fa6"
import { FaTrashCan } from "react-icons/fa6"
import { FaPenToSquare } from "react-icons/fa6"
import { FaCircleUser } from "react-icons/fa6"

export function Post() {
  const { post, user } = useLoaderData()

  const authToken = getItem("userAuth")
  const { userId: currentUser, role } = authToken
  const admin = role === "admin"

  const navigate = useNavigate()

  console.log("post page , auth token", authToken)
  console.log("post page, current user", currentUser)
  console.log("post page, admin", admin)

  const [count, setCount] = useState(0)

  const [liked, setLiked] = useState()

  const [showNavMenu, setShowNavMenu] = useState(false)

  function toggleNavMenu() {
    setShowNavMenu(!showNavMenu)
  }

  useEffect(() => {
    async function fetchLikes() {
      try {
        const response = await userHasLiked(post.postId)
        const hasLiked = response.userHasLiked
        setLiked(hasLiked)
      } catch (error) {
        console.log(error)
      }
    }

    async function fetchLikesCount() {
      try {
        const response = await getLikes(post.postId)
        const counter = response.counter
        setCount(counter)
      } catch (error) {
        console.log(error)
      }
    }

    fetchLikes()
    fetchLikesCount()
  }, [post.postId])

  async function handleLike() {
    try {
      const response = await likePost(post.postId, user.userId)
      const storedLike = response.storedLike

      // Toggle du like
      setLiked(!liked)

      setCount((prevCount) => prevCount + (storedLike ? 1 : -1))
    } catch (error) {
      console.log(error)
    }
  }

  //supprimer un post
  async function handleDelete() {
    console.log("Delete button clicked")

    if (
      !window.confirm(
        "êtes vous sûr(e) de vouloir supprimer cette publication ?"
      )
    ) {
      return
    }

    try {
      await deletePost(post.postId)
      navigate("/posts")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="wrapper-one-post">
        <div className="header-one-post">
          <span className="post-username">
            <Link to={`/profile/${post.userId}`} aria-label="profil utilisateur ">
              <FaCircleUser aria-hidden="true"/> {user.email}
            </Link>
          </span>

          {console.log(
            "permission pour modifier et supprimer le post: ",
            post.userId === currentUser || admin
          )}
          {console.log("post file, postUserid", post.userId)}

          {(post.userId === currentUser || admin) && (
            <nav className="post-nav">
              <div className="post-nav-menu">
                <button
                  className="nav-menu-toggle"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onClick={toggleNavMenu}
                >
                  <span className="ellipsis-icon">...</span>
                </button>
                <ul
                  className={`dropdown-menu ${showNavMenu ? "show" : ""}`}
                  aria-hidden="true"
                >
                  <li>
                    {" "}
                    <Link className="btn-modify" to="edit" aria-label="modifier le post">
                      <FaPenToSquare aria-hidden="true"/> Modifier
                    </Link>
                  </li>

                  <li>
                    {" "}
                    <button
                      className="btn-delete" aria-label="supprimer le post"
                      onClick={() => handleDelete()}
                    >
                      <FaTrashCan aria-hidden="true"/> Supprimer
                    </button>
                  </li>
                </ul>
              </div>
            </nav>
          )}
        </div>

        <div className="container-post-img">
          {post.imageUrl ? (
            <img className="post-img" src={post.imageUrl} alt="image du post"/>
          ) : null}
        </div>

        {post.content ? (
          <div className="post-content">{post.content}</div>
        ) : null}

        <div className="post-footer">
          <div className="post-date">Crée le: {post.dateCreated} </div>

          <button
            className="btn-like"
            title={liked ? "j'aime" : "Je n'aime plus"} aria-label={liked ? "J'aime ce post" : "Je n'aime plus ce post"}
            onClick={() => handleLike()} 
          >
            <FaThumbsUp className={`like-icon ${liked ? "off" : "on"}`} aria-hidden="true"/>
          </button>
        </div>

        <span className="count-likes" style={{ color: "#656464" }} aria-label={`${count} j'aime`}>
          {count} j&apos;aime
        </span>
      </div>
    </>
  )
}

async function loader({ request: { signal }, params: { postId } }) {
  const post = await getOnePost(postId, { signal })
  const user = await getOneUser(post.userId, { signal })

  console.log("Post, post de page post seul", post)
  console.log("Post, id du post gris car string", postId)
  console.log("****Post, ici pb , id du user qui a creer le post", post.userId)
  console.log("***Post, user de page post seul", user)

  return { post, user }
}

export const postRoute = {
  loader,
  element: <Post />,
}
