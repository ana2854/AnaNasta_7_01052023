import { Form, Link } from "react-router-dom"
import { FaCircleXmark, FaPaperPlane } from "react-icons/fa6"

export function PostForm({ defaultValues = {} }) {
  return (
    <Form method="post" className="form-post" encType="multipart/form-data">
      <div className="form-row">
        <div className="form-group error">
          <label htmlFor="imageUrl">Ajouter une image</label>
          <input type="file" name="imageUrl" id="imageUrl" />{" "}
          {defaultValues.imageUrl && (
            <img
              src={defaultValues.imageUrl}
              className="edit-img"
              alt="image téléchargée"
            />
          )}
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="content">Contenu</label>
          <textarea
            name="content"
            id="content"
            defaultValue={defaultValues.content}
            maxLength={1000}
          />
        </div>
      </div>
      <div className="form-btn-row">
        <Link
          className="btn action"
          to="/posts"
          aria-label="Annuler et revenir aux posts"
        >
          <FaCircleXmark aria-hidden="true" /> Annuler
        </Link>
        <button className="btn action" aria-label="Envoyer le post">
          <FaPaperPlane aria-hidden="true" /> Envoyer
        </button>
      </div>
    </Form>
  )
}
