//import axios from "axios"
//import {useLoaderData} from "react-router-dom"

export function PostList() {
//const posts = useLoaderData()



  return (
    <>
      <div className="wrapper-postList">
        <h1 className="page-title">Posts of all users </h1>

      
        <div className="card-list">A card</div>
      </div>
    </>
  )
}

/*
function loader({request : {signal}}) {
 
    return axios 
    .get("http://localhost:3000/posts", {signal})
    .then(res =>  res.data)
  
}

export const postListRoute = {
  loader, 
  element : <PostList/>
}
*/