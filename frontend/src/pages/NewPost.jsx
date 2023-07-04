import { Form, Link, redirect } from "react-router-dom"
import { createPost } from "../api/posts"

function NewPost() {
  return (
    <>
      
      <div className="container">
        <div className="wrapper-form-newpost">
        <h1 className="page-title">Créez un post</h1>

        <Form method="post" className="form-post" encType="multipart/form-data">
          <div className="form-row">
            <div className="form-group error">
              <label htmlFor="imageUrl">Ajouter une image</label>
              <input type="file" name="imageUrl" id="imageUrl" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="content">Contenu</label>
              <textarea name="content" id="content" maxLength={1000}></textarea>
            </div>
          </div>
          <div className="form-btn-row">
            <Link className="btn action btn-outline" to="/posts">
              Annuler
            </Link>
            <button className="btn action">Envoyer</button>
          </div>
        </Form>
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

/*
async function action({ request, response }) {
  const formData = await request.formData()
  console.log("Form Data from newpost page:", formData)

  const imageUrl = formData.get("imageUrl")
  const content = formData.get("content")

  if (!imageUrl && !content) {
    return response.status(400).json({ error: "contenu vide" })
  }

  const post = await createPost(
    { content, imageUrl },
    { signal: request.signal }
  )

  return redirect(`/posts/${post.postId.toString()}`)
}
*/
export const newPostRoute = {
  action,
  element: <NewPost />,
}
