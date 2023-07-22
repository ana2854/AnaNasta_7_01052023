import { getOneUser } from "../api/user"
import { getUserPosts } from "../api/posts"
import { useLoaderData } from "react-router-dom"
import { PostCard } from "../component/PostCard"
import { FaUser } from "react-icons/fa6"

export function Profile() {
  const { user, userPosts } = useLoaderData()
  console.log("profil user loader", user)
  console.log("profil userPosts loader", userPosts)

  return (
    <>
      <div className="wrapper-profile">
        <h1>Mon profil </h1>
        <h2 className="profil-username" aria-label={`profil de ${user.email}`}>
          <FaUser aria-hidden="true" /> {user.email}
        </h2>

        <div className="grille-posts">
          {userPosts.map((post) => (
            <PostCard key={post.postId} {...post} />
          ))}
        </div>
      </div>
    </>
  )
}


async function loader({ request: { signal }, params: { userId } }) {
  const [userPosts, user] = await Promise.all([
    getUserPosts(userId, { signal }),
    getOneUser(userId, { signal }),
  ])

  console.log("Profil , userPost", userPosts)
  console.log("Profil , user", user)
  return { userPosts, user }
}

// eslint-disable-next-line react-refresh/only-export-components
export const userProfileRoute = {
  loader,
  element: <Profile />,
}
