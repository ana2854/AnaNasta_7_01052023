// page d'accueil avec posts de tous les users

import { useLoaderData } from "react-router-dom"
import { getLatestPosts } from "../api/posts"
import { PostCard } from "../component/PostCard"
import { Link } from "react-router-dom"
import {FaPen} from "react-icons/fa6"


// eslint-disable-next-line react-refresh/only-export-components
function PostList() {
  //const posts = useLoaderData()
  const { posts } = useLoaderData()

  return (
    <>
      <div className="wrapper-postList">
        <div className="postList-header">
          <h1>Posts utilisateurs </h1>
          <div className="btn create">
            <Link className="btn btn-outline" to="new">
             <FaPen/> Crée un post
            </Link>
          </div>
        </div>

        <div className="grille-posts">
          {posts.map((post) => (
            <PostCard key={post.postId} {...post} />
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
