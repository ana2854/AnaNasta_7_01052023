// page d'accueil avec posts de tous les users

import { useLoaderData } from "react-router-dom"
import { getLatestPosts } from "../api/posts"
import { PostCard } from "../component/PostCard"
import { Link } from "react-router-dom"
import { FaPen } from "react-icons/fa6"

function PostList() {
  const { posts } = useLoaderData()

  return (
    <>
      <div className="wrapper-postList">
        <div className="postList-header">
          <h1>Posts utilisateurs </h1>

          <Link className="btn-create" aria-label="créer un post" to="new">
            <FaPen aria-label="true" /> Créer un post
          </Link>
        </div>

        <div className="grille-posts">
          {posts.map((post) => (
            <PostCard
              key={post.postId}
              aria-label={`Post de ${post.username}`}
              {...post}
            />
          ))}
        </div>
      </div>
    </>
  )
}

async function loader({ request: { signal } }) {
  const posts = await getLatestPosts({ signal })
  console.log("posts de la postList", posts)
  return { posts }
}

export const postListRoute = {
  loader,
  element: <PostList />,
}
