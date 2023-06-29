// page d'accueil avec posts de tous les users

import { useLoaderData } from "react-router-dom"
import { getLatestPosts} from "../api/posts"

import { PostCard } from "../component/PostCard"


// eslint-disable-next-line react-refresh/only-export-components
function PostList() {

  
  const posts = useLoaderData()

  return (
    <>
     <h1>Posts utilisateurs </h1>
   
      <div className="grille-posts">
        {posts.map(post => (
          <PostCard key={post.postId} {...post} />
        ))}
      </div>
    </>
  )
}

function loader({ request: { signal } }) {
  return getLatestPosts({ signal })
}

export const postListRoute = {
  loader,
  element: <PostList />,
}
