// vignette posts page d'accueil + page user

import { Link } from "react-router-dom"

export function PostCard({ postId, content }) {
  return (
    <div className="postCard">
      <div className="postCard-body">
        <div className="postCard-preview-text">{content}</div>
      </div>
      <div className="postCard-footer">
        <Link className="postCard-btn" to={`/posts/${postId}`}>
          Voir plus 
        </Link>
      </div>
    </div>
  )
}
