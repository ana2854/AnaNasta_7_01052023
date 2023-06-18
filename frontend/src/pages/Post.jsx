export function Post () {

return ( 
<>

    <span className="post-username">By : dynamic name</span>
    {/*By: <Link to={`/users/${user.id}`}>{user.name}</Link>)*/}


<div className="post-content" >POST BODY HERE</div>
{/*post.body */}

<div className="post-date">Crée le: dynamic date</div>

<button className="btn-post-like">POUCE BLEU</button>
<button className="btn-post-modify">MODIFIER</button>
<button className="btn-post-delete">SUPPRIMER</button>

</>

)
}