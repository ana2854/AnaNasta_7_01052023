import { getOneUser } from "../api/user"
import { getUserPosts } from "../api/posts"
import { useLoaderData } from "react-router-dom"
import { PostCard } from "../component/PostCard"

export function Profile() {
  const { user, userPosts } = useLoaderData()
  return (
    <>
      <h1>Profil utilisateur </h1>
      <span className="username"> Auteur : {user.email} </span>

      <div className="grille-posts">
        {userPosts.map((post) => (
          <PostCard key={post.postId} {...post} />
        ))}
      </div>
    </>
  )
}

async function loader({ request: { signal }, params: { userId } }) {
  //Posts
  const userPosts = getUserPosts(userId, { signal })
  //user
  const user = getOneUser(userId, { signal })

  return { userPosts: await userPosts, user: await user }
}

// eslint-disable-next-line react-refresh/only-export-components
export const userProfileRoute = {
  loader,
  element: <Profile />,
}
