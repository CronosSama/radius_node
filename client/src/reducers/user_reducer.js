import { SET_CURRENT_USER } from "../actions/actionType"

const defaultState = {
  isAuthenticated : false,
  user : {}
}

const user_reducer = (userState = defaultState, action) => {

  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated : !!Object.keys(action.user).length,
        user : action.user
      }
    
      default : 
      return userState

  }


}
export default user_reducer
