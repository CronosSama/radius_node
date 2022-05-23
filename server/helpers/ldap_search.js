import { client } from "../index.js";
import { nthash } from "smbhash";
import crypto from "crypto"

export const ldapsearch = async(filter,attributes) => {
const opts = {
  // filter: '(mail=test@localhost)',
  filter,
  scope: 'sub',
  attributes
  // attributes: ['uidNumber']
};
    const data = () => {
      var ldap_entries = []
    
      return new Promise((resolve,reject)=> {       
      client.search(process.env.DOMAIN, opts, (err, response) => {
      if(err){
        console.log("error in searched \n",err)
      } 
      else{
      response.on('searchRequest', (searchRequest) => {
        console.log('searchRequest: ', searchRequest.messageID);
      });
        response.on('searchEntry', (entry) => {
        //convert OBJECT TO JSON STRING, then JSON STRING TO JSON OBJECT
        
         ldap_entries.push(JSON.parse(JSON.stringify(entry.object)))
        console.log('entry: ' + JSON.stringify(entry.object));
      });
      response.on('searchReference', (referral) => {
        console.log('referral: ' + referral.uris.join());
      });
      response.on('error', (err) => {
        console.error('error: ' + err.message);
      });
      response.on('end', (result) => {
        console.log('status: ' + result.status);
        if(ldap_entries.length == 0){
          console.log("we here")
          return reject()
        }

        else {
        return resolve(ldap_entries)
        }
      });
    }
    });
  })  
  }
    let final_result = await data().then((data)=>data).catch(()=> false)
    console.log(final_result)
    return final_result
}



export const uidNumberOne = async() => {

  // let result = await ldapsearch('(cn=*)',['sambaSID'])
  // const uids = []
  // for(let entries of result){
  //   entries['sambaSID'] !== undefined ? uids.push(Number(entries['sambaSID'])) : null

  // }
  // console.log(uids)
  // let biggest_uid = Math.max.apply(Math,uids) + 1
  
  const sambaSID =  crypto.randomUUID({disableEntropyCache:true})
  return sambaSID

}

export const compareNTPassword = async(dn,input_password) => {

  let password = nthash(input_password)
  let verifyPassword = () => {
  
  return new Promise((resolve,reject)=> {
      client.compare(dn,'sambaNTPassword',password,(err,matched)=> {
      if(err != null){
        console.log("ERROR IN COMPARE")
        return reject(err)
      }
      else {
        //matched return true or false
        console.log('matched password', matched)
        return resolve(matched)
      }
    })
  }
  )
  
}

  return await verifyPassword().then((state)=> state).catch((err)=> err)
}


export const HASH_NTPassword = (input_password) => nthash(input_password)
// export const ldapsearch = async(filter,attributes) => {
//   const opts = {
//     // filter: '(mail=test@localhost)',
//     filter,
//     scope: 'sub',
//     attributes
//     // attributes: ['uidNumber']
//   };
//         var ldap_entries = []
      
//         return new Promise((resolve,reject)=> {       
//         client.search(process.env.DOMAIN, opts, (err, response) => {
//         if(err){
//           console.log("error in searched \n",err)
//         } 
//         else{
//         response.on('searchRequest', (searchRequest) => {
//           console.log('searchRequest: ', searchRequest.messageID);
//         });
//           response.on('searchEntry', (entry) => {
//           //convert OBJECT TO JSON STRING, then JSON STRING TO JSON OBJECT
          
//            ldap_entries.push(JSON.parse(JSON.stringify(entry.object)))
//           console.log('entry: ' + JSON.stringify(entry.object));
//         });
//         response.on('searchReference', (referral) => {
//           console.log('referral: ' + referral.uris.join());
//         });
//         response.on('error', (err) => {
//           console.error('error: ' + err.message);
//         });
//         response.on('end', (result) => {
//           console.log('status: ' + result.status);
//           if(ldap_entries.length == 0){
//             console.log("we here")
//             return reject('[LDAP]: NO SUCH Object')
//           }
  
//           else {
//           return resolve(ldap_entries)
//           }
//         });
//       }
//       });
//     })  
    
//   }