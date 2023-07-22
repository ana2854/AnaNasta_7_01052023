// vignette posts page d'accueil + page user

import { Link } from "react-router-dom"

export function PostCard({ postId, content, imageUrl }) {
  console.log("PostCard component - Start")
  console.log("postId:", postId)
  console.log("content:", content)
  console.log("imageUrl:", imageUrl)

  return (
    <>
      <div className="postCard">
        <div className="postCard-body">
          <div className="postCard-header-img">
            {imageUrl ? (
              <img className="postCard-img" src={imageUrl} alt="image du post" />
            ) : null}
          </div>

          {content ? (
            <div className="postCard-preview-text">{content}</div>
          ) : null}
        </div>

        <div className="postCard-footer">
          <Link
            className="btn-view"
            to={`/posts/${postId}`}
            aria-label={`Voir plus sur le post ${postId}`}
          >
            Voir plus
          </Link>
        </div>
      </div>
    </>
  )
}
