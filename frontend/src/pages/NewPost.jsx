import { redirect } from "react-router-dom"
import { createPost } from "../api/posts"
import { PostForm } from "../component/PostForm"

function NewPost() {
  return (
    <>
      <div className="container-post">
        <div className="wrapper-form-newpost">
          <h1 className="page-title">Créer un post</h1>

          <PostForm />
        </div>
      </div>
    </>
  )
}

async function action({ request, response }) {
  const formData = await request.formData()
  console.log("Form Data from newpost page:", formData)

  const imageFile = formData.get("imageUrl")
  const content = formData.get("content")

  if (!imageFile && !content) {
    return response.status(400).json({ error: "contenu vide" })
  }

  const formDataToSend = new FormData()
  formDataToSend.append("imageUrl", imageFile)
  formDataToSend.append("content", content)

  const post = await createPost(formDataToSend, { signal: request.signal })

  return redirect(`/posts/${post.postId.toString()}`)
}

export const newPostRoute = {
  action,
  element: <NewPost />,
}
