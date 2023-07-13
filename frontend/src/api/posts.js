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

export async function createPost(data) {
  return await baseApi
    .post("api/post/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data)
}

//modifier post
export async function modifyPost(id, data) {
  return await baseApi
    .put(`api/post/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data)
}

//like post
export async function likePost(postId, options) {
  const res = await baseApi.post(`api/post/${postId}/like`, options)
  return res.data
}

//get likes counter
export async function getLikes(postId, options) {
  const res = await baseApi.get(`api/post/${postId}/likeCounter`, options)
  return res.data
}

//get like by user
export async function userHasLiked(postId, options) {
  const res = await baseApi.get(`api/post/${postId}/user-liked`, options)
  return res.data
}

//supprime un post
export async function deletePost(postId, options) {
  const res = await baseApi.delete(`api/post/${postId}`, options)
  return res.data
}
