import { useLoaderData, redirect } from "react-router-dom"
import { getOnePost, modifyPost } from "../api/posts"
import { PostForm } from "../component/PostForm"
import { getItem } from "../utils/LocalStorage"

function EditPost() {
  const { post } = useLoaderData()
  console.log(post)

  return (
    <>
      <div className="container-post">
        <div className="wrapper-form-newpost">
          <h1 className="page-title">Modifier mon post</h1>

          <PostForm defaultValues={post} />
        </div>
      </div>
    </>
  )
}

async function loader({ request: { signal }, params: { postId } }) {
  const post = getOnePost(postId, { signal })
  return { post: await post }
}

async function action({ request, response, params: { postId } }) {
  const authToken = getItem("userAuth")
  const { userId: currentUser, role } = authToken
  const admin = role === "admin"

  const post = await getOnePost(postId, { signal: request.signal })

  if (post.userId === currentUser || admin) {
    const formData = await request.formData()
    console.log("Form Data de la page modifier:", formData)

    const imageFile = formData.get("imageUrl")
    const content = formData.get("content")

    if (!imageFile && !content) {
      return response.status(400).json({ error: "contenu vide" })
    }

    const formDataToSend = new FormData()
    formDataToSend.append("imageUrl", imageFile)
    formDataToSend.append("content", content)

    const post = await modifyPost(postId, formDataToSend, {
      signal: request.signal,
    })

    return redirect(`/posts/${post.postId}`)
  }
}

export const editPostRoute = {
  loader,
  action,
  element: <EditPost />,
}
