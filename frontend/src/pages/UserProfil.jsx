import { getOneUser } from "../api/user"

export function UserProfil() {
  return (
    <>
      <h1 className="user-name"> Dynamic user name </h1>

      <h3>Posts of the user </h3>
      <div className="card"></div>
    </>
  )
}



async function loader({ request: { signal }, params: {userId} }) {
    const user = await getOneUser({ signal }
   
}


export const userProfilRoute = {
  loader,
  element: <UserProfil />,
}


/*export async function getOneUser(userId, options) {
  const res = await baseApi.get(`api/auth/${userId}`, options)
    return res.data
}
*/
