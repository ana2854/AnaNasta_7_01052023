//post seul en entier + comm
import { useNavigate, useLoaderData } from "react-router-dom"
import { getOnePost } from "../api/posts"
import { getOneUser } from "../api/user"
import { Link } from "react-router-dom"
import { getItem } from "../utils/LocalStorage"
import { deletePost } from "../api/posts"

export function Post() {
  const { post, user } = useLoaderData()

  const authToken = getItem("userAuth")
  const { userId: currentUser, role } = authToken
  const admin = role === "admin"

  const navigate = useNavigate()

  console.log("post page , auth token", authToken)
  console.log("post page, current user", currentUser)
  console.log("post page, admin", admin)

  async function handleDelete() {
    console.log("Delete button clicked")
    try {
      await deletePost(post.postId)
      navigate("/posts")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <span className="post-username">
        Auteur: <Link to={`/profile/${post.userId}`}>{user.email}</Link>
      </span>

      {console.log("post file, image", post.imageUrl)}
      {post.imageUrl ? <img className="post-img" src={post.imageUrl} /> : null}
      <div className="post-content">{post.content}</div>

      <div className="post-date">Crée le: {post.dateCreated}</div>

      <button className="btn like">POUCE BLEU</button>
      <button className="btn modify">MODIFIER</button>

      {console.log("Check Condition: ", post.userId === currentUser || admin)}
      {console.log("post file, postUserid", post.userId)}
      {(post.userId === currentUser || admin) && (
        <button className="btn delete" onClick={() => handleDelete()}>
          SUPPRIMER
        </button>
      )}
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
