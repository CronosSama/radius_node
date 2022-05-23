import * as api from "../api/index"
import * as action_type from "./actionType"


//Action creator (function that create actions )

/*
const getPosts = () => {
  return async(dispatch) => {

  }
}
*/

export const getDonations = () => async(dispatch) => {

  const data = await api.caller("get",api.uri)
  dispatch({type : action_type.GET_ALL_DONATIONS ,data});

}

export const createDonation = (body_data) => async(dispatch) => {
  try {

    const data = await api.caller("post",api.uri,body_data);
    console.log(data)
    dispatch({type : action_type.CREATE_DONATION, data})
  } catch (error) {
    console.log(error.message)
  }

}
// /auth/:user_id/donation/:donation_id
export const modifyDonation = (user_id,donation_id,body_data) => async(dispatch) => {
  try {
    const data = await api.caller("patch",`${api.uri_user}/${user_id}/donation/${donation_id}`,body_data)
    dispatch({
      type : action_type.MODIFY_DONATION,
      data
    })
  } catch (error) {
    console.log(error.message)
  }
}

export const deleteDonation = (user_id,donation_id) => async(dispatch) => {
  try {
    const data = await api.caller("delete",`${api.uri_user}/${user_id}/donation/${donation_id}`)
    dispatch({
      type : action_type.DELETE_DONATION,
      data
    })
  } catch (error) {
    console.log(error.message)
  }
}

export const searchQueryDonations = (searchQuery) => async(dispatch) => {

  try {

    const data = await api.caller("get", `${api.uri}/search?searchQuery=${searchQuery.search}&tags=${searchQuery.tags}`)
    
    dispatch({
      type : action_type.SEARCH_DONATIONS ,
      data
    })
    
  } catch (error) {
    return error
  }

}