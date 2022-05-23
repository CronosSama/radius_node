import jwt from "jsonwebtoken"
const Authentification_Error = (next,message="UnAuthorized") => next({status : 401, message})

export const Authentication = async(req,res,next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token,process.env.TOKEN_KEY,(err,decoded)=> {
      if(decoded){
        return next()
      }
      else {

         Authentification_Error(next,"UnAuthenticated")

      }

    }) 
  } catch (error) {
    Authentification_Error(next,"UnAuthenticated")
  }


} 


export const Authorization = async(req,res,next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]

    jwt.verify(token,process.env.TOKEN_KEY,(err,decoded)=>{
      console.log(decoded.sambaSID)
      if(decoded){
        if(decoded.sambaSID === req.params.sambaSID){
          return next()
        }
        else {
          Authentification_Error(next)
        }

      }
      else {
        Authentification_Error(next)
      }
    })


  } catch (error) {
    Authentification_Error(next,error)
  }

 
  }


