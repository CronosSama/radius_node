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
app.use(cors())

//Limiting the size of the request/responses to not be more than 30mb
//because this line was after the bodyparser it didn't work lol


app.use(bodyParser.json({limit : "30mb",extended:true}))
app.use(bodyParser.urlencoded({limit : "30mb",extended:true}))

//START of our  Routes will be here
app.use("/api/auth",router)

const connection = (Manager,password) => {
  const client = ldapjs.createClient({
    url: process.env.LDAP_SERVER
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


  app.listen(PORT,()=>{
    console.log(chalk.magenta.bgBlack(`SERVER IS RUNNING  [${PORT}]`))
  })


