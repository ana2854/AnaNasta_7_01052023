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
        <h2 className="profil-username">
          <FaUser /> {user.email}
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

/*
async function loader({ request: { signal }, params: { userId } }) {
  //Posts
  const userPosts = getUserPosts(userId, { signal })
  //user
  const user = getOneUser(userId, { signal })

  console.log('Loaded user:', user); // <- Check that user data is correct
  console.log('Loaded posts:', userPosts); // <- Check that posts data is correct

  return { userPosts: await userPosts, user: await user }
}
*/
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
