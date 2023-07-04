// vignette posts page d'accueil + page user

import { Link } from "react-router-dom"

export function PostCard({ postId, content, imageUrl }) {
  console.log("PostCard component - Start")
  console.log("postId:", postId)
  console.log("content:", content)
  console.log("imageUrl:", imageUrl)

  return (
    <div className="postCard">
      <div className="postCard-body">
        {imageUrl ? (
          <img className="postCard-img" src={imageUrl} alt="post image" />
        ) : null}
        <div className="postCard-preview-text">{content}</div>
      </div>
      
      <div className="postCard-footer">
        <Link className="btn-view" to={`/posts/${postId}`}>
          Voir plus
        </Link>
      </div>
    </div>
  )
}
