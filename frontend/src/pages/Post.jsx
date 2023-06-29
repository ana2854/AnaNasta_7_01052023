//post seul en entier + comm
import { useLoaderData } from "react-router-dom"
import { getOnePost } from "../api/posts"
import { getOneUser } from "../api/user"
import { Link } from "react-router-dom"
//import { getItem } from "../utils/LocalStorage"

export function Post() {
  const { post, user } = useLoaderData()

  //const authToken = getItem("userAuth")
  //const userId = authToken ? authToken.userId : null

  return (
    <>
      <span className="post-username">
        Auteur: <Link to={`/profile/${post.userId}`}>{user.email}</Link>
      </span>

      <div className="post-content">{post.content}</div>

      <div className="post-date">Crée le: {post.dateCreated}</div>

      <button className="btn-post-like">POUCE BLEU</button>
      <button className="btn-post-modify">MODIFIER</button>
      <button className="btn-post-delete">SUPPRIMER</button>
    </>
  )
}

async function loader({ request: { signal }, params: { postId } }) {
  const post = await getOnePost(postId, { signal })
  const user = await getOneUser(post.userId, { signal })

  return { post, user }
}

export const postRoute = {
  loader,
  element: <Post />,
}
