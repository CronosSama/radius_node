import axios from "axios"

export const uri_user = 'http://localhost:3001/api/auth'

// export const fetchPosts = () => axios.get(url)

export const caller = async(method,path,payload=null) => {
  try{

    const { data } = await axios[method](path,payload)
    return data
  }catch(error){

    console.log(`[-] Error : [URL]:${path}\n[Method]:${method}\n[File]:index.js(api) ...`)
    console.log(error.message)
  }
}


export const  setTokenHeader = async(token) =>{
  if(token){
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    console.log(axios.defaults.headers.common["Authorization"])
  }
  else {
    delete axios.defaults.headers.common["Authorization"]
  }
}
