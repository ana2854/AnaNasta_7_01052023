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

      // Toggle the liked state
      setLiked(!liked)

      // Update the count based on the storedLike value
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
            Auteur: <Link to={`/profile/${post.userId}`}>{user.email}</Link>
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
              >
                <span className="ellipsis-icon">...</span>
              </button>
              <ul className="dropdown-menu" aria-hidden="true">
                <li>
                  {" "}
                  <Link className="btn-modify" to="edit">
                    <FaPenToSquare /> MODIFIER
                  </Link>
                </li>

                <li>
                  {" "}
                  <button className="btn-delete" onClick={() => handleDelete()}>
                    <FaTrashCan /> SUPPRIMER
                  </button>
                </li>
              </ul>
              </div>
            </nav>
          )}
        </div>

        <div className="post-header-img">
          {console.log("post file, image", post.imageUrl)}
          {post.imageUrl ? (
            <img className="post-img" src={post.imageUrl} />
          ) : null}
        </div>
        <div className="post-content">{post.content}</div>
        <div className="post-date">Crée le: {post.dateCreated}</div>
      </div>

      <button
        className="btn-like"
        title={liked ? "j'aime" : "Je n'aime plus"}
        onClick={() => handleLike()}
      >
        <FaThumbsUp className={`like-icon ${liked ? "off" : "on"}`} />
      </button>
      <span style={{ color: "#888" }}>{count} j&apos;aime</span>
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
