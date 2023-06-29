import { baseApi } from "./base"

//accès aux posts
export async function getAllPosts(options) {
  const res = await baseApi.get(`api/post`, options)
  return res.data
}

//accès aux posts d'un user
export async function getUserPosts(userId, options) {
  const res = await baseApi.get(`api/post/profile/${userId}`, options)
  return res.data
}

//accès à un post
export async function getOnePost(postId, options) {
  const res = await baseApi.get(`api/post/${postId}`, options)
  return res.data
}

//accès aux derniers posts
export async function getLatestPosts(options) {
  const res = await baseApi.get(`api/post/latest`, options)
  return res.data
}

//création post
export async function createPost(data, options) {
  const res = await baseApi.post(`api/post/`, data, options)
  return res.data
}


