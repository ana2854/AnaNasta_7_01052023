import { baseApi } from "./base"

export async function getOneUser(userId, options) {
  const res = await baseApi.get(`api/auth/${userId}`, options)
  return res.data
}


