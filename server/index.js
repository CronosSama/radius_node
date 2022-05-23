import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import Error_Handler from './controllers/error_handler.js';
import chalk from 'chalk';
import dotenv from "dotenv";
import ldapjs from "ldapjs"
import router from "./routes/auth_routes.js"
import { HASH_NTPassword, ldapsearch } from './helpers/ldap_search.js';
dotenv.config();
//the first one is because heroku going to add an entry to out env file called PORT
//that our website will be using

const PORT = process.env.PORT;
const app = express();

//Limiting the size of the request/responses to not be more than 30mb
app.use(bodyParser.json({limit : "30mb",extended:true}))
app.use(bodyParser.urlencoded({limit : "30mb",extended:true}))
app.use(cors())

//START of our  Routes will be here
app.use("/api/auth",router)

const connection = (Manager,password) => {
  const client = ldapjs.createClient({
    url: 'ldap://172.16.50.30:389'
  })

  client.bind(Manager,password,(err)=>{
    if(err){
      console.log(" error happend in binding.\n",err)
    }
    else{
      console.log("SUCCESS \n")
      
    }
  })
  return client
}


export const client = connection(process.env.MANAGER,process.env.PASSWORD)

app.get("/api/",async(req,res,next)=> {

  let result = await ldapsearch('(cn=*)',['uidNumber'])

  result != false ? res.json(result) : next( {message : '[LDAP]: NO SUCH Object'})
})

app.put("/api",(req,res,next)=> {

  let new_password = HASH_NTPassword("123")
  let change = new ldapjs.Change({
    operation: 'replace',
    modification : {
      sambaNTPassword: new_password,
    }

  })
    client.modify("cn=mohammed bouassida,ou=stagaires,dc=mohammed,dc=lab",change,((err)=>{
      if(err != null){

        console.log(err)

      }
    }))
    // if(err){
    //   console.log("ERROR IN COMPARE")
    // }
    // else {
    //   console.log('matched password', matched)
    //   res.json(matched)
    // }

  })


// })

// app.post("/api",(res,req,next)=> {
//   // const {uid,cn} = req.body
//   let password = nthash("Sw0rd123")
//   console.log(password)
//   const entry = {
//     objectClass: ['inetorgperson'],
//     cn:'TEST NODEJS',
//     sn: 'NODEJS',
//     Email: '',
//     Password: password,
//     givenname: 'TEST'

//   }
//   client.add('cn=TESTNODEJS,ou=People,dc=mohammed,dc=lab',entry,(err)=> {
//     console.log("ERROR WHILE ADDING \n",err)
//   })

// })







//End of our Routes
//// Errors : 
// make an error if the user got here, that will only happens if only the route doesn't exist
// middleware


app.use((req,res,next)=>{
  let err = new Error("[app.use] The Route Not Found !!")
  err.status = 404
  next(err)

})
//middleware will handle All Error
app.use(Error_Handler)


////Connecting to the database and starting the server 
//.connect returns a promise

mongoose.set("debug",true);
// So we can use async and promises instead of callback function
mongoose.Promise = Promise;
const connection_url = process.env.CONNECTION_URL







mongoose.connect(connection_url,{
    keepAlive : true,
    useNewUrlParser: true,
    useUnifiedTopology: true
    //if the connection is successful (server is running), let the app listen in this PORT
}).then(()=>{
  app.listen(PORT,()=>{
    console.log(chalk.magenta.bgBlack(`SERVER IS RUNNING  [${PORT}]`))
  })
}).catch((err)=>console.log("AN ERROR HAPPEND ... ",err))

