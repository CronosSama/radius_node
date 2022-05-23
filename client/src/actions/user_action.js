import * as api from "../api/index"
import { SET_CURRENT_USER } from "./actionType"

export const userLogin = (userData,type) => async(dispatch) => {
  try {

    const findUser = await api.caller("post",`${api.uri_user}/${type}`,userData)
    if (Object.keys(findUser)[0] === "message"){
      console.log(`error : ${findUser.message}`)

    }else {
      const { token, ...user } = findUser

      localStorage.setItem("jwtToken",token)
      api.setTokenHeader(token)
      dispatch(setUser(user))


    }
  }catch(error){
    return error

  }
}

export const setUser = (user={})=> ({
  user,
  type : SET_CURRENT_USER
})



export const logOutUser= () => (dispatch) => {

  localStorage.clear()
  api.setTokenHeader(false)
  dispatch(setUser({}))
}



