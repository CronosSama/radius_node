import { client } from "../index.js"
import {nthash} from "smbhash"
import ldapjs from "ldapjs"
import { ldapsearch, uidNumberOne,HASH_NTPassword, compareNTPassword } from "../helpers/ldap_search.js"
import jwt from "jsonwebtoken"
const f_token = (userData) => jwt.sign(userData,process.env.TOKEN_KEY,{'expiresIn' : '1h'})



export const addUserLdap = async(req,res,next) => {
  // const {uid,cn} = req.body
  try {
    const { surname,givenname,password,mail } = req.body
  console.log("we hhhhere 2 ",surname,givenname,password,mail)

  let verifyExist = await ldapsearch(`mail=${mail}`,['dn'])

  if(!verifyExist){
    let NTPassword = HASH_NTPassword(password)

    console.log(NTPassword)
    let sambaSID = await uidNumberOne()
    let cn = `${givenname} ${surname}`
    let dn = `cn=${cn},ou=People,${process.env.DOMAIN}`
    console.log("we here",dn)
    const entry = {
      objectClass: ['inetorgperson',"sambaSamAccount"],
      cn,
      sn: surname,
      sambaNTPassword: NTPassword,
      givenname,
      mail,
      sambaSID,
      uid:cn,
      
  
    }
    let token = f_token({
      dn,
      cn,
      mail,
      sambaSID

    })
    client.add(dn,entry,(err)=> {
      console.log("ERROR WHILE ADDING \n",err)
    })
    let full_info = await ldapsearch(`mail=${mail}`,['*'])
    res.json({token,full_info}).status(200)
  }
  else {
    return next({
      message : 'THE EMAIL ALREADY EXISTS'
    })
  }

  } catch (error) {
    return `Error in the addUserLdap \n${error}`
  }


}


export const loginLdapUser = async(req,res,next) => {

  try {

  const {mail,password} = req.body
  let verifyExist = await ldapsearch(`mail=${mail}`,['*'])
  if(verifyExist){
    let {dn, cn, mail,sambaSID} = verifyExist[0]
    let verifyPassword = await compareNTPassword(dn,password)
    if(verifyPassword){
      let full_info = await ldapsearch(`mail=${mail}`,['*'])
      console.log("TRUUUE PASWWORD")

      let token = f_token({
        dn,
        cn,
        mail,
        sambaSID

      })

      res.json({token,full_info}).status(200)
    }
    else {
      return next({
        message : 'Wrong Password !!!'
      })
    }

  }else {
    return next({
      message : 'User does not exist'
    })
  }


  } catch (error) {
    return `Error in the loginLdapUser \n${error}`
    
  }

}


export const modifyLdapUser = async(req,res,next) => {
  try {
    let { password, new_password } = req.body

    let verifyExist = await ldapsearch(`sambaSID=${req.params.sambaSID}`,['*'])
    if(verifyExist){
      const { dn }  = verifyExist[0]
      let verifyPassword = await compareNTPassword(dn,password)
      if(verifyPassword){
        new_password = nthash(new_password)
        let change = new ldapjs.Change({
          operation: 'replace',
          modification : {
            sambaNTPassword: new_password,
          }
      
        })
          client.modify(dn,change,((err)=>{
            if(err != null){
      
              console.log(err)
      
            }
          }))
          res.json(verifyExist).status(200)
        }
        else{
          return next({
            message : "WRONG PASSWORD !!!"
          })
        }

    }
    else {
      return next({
        message : "USER does not exist"
      })
    }

  } catch (error) {
    return `Error in the modifyLdapUser \n${error}`
    
  }


}