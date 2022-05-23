import React, { useState } from 'react';
import {Container, Grid, Paper, Avatar, Typography, Button} from "@material-ui/core"
import { useDispatch } from "react-redux"
import {userLogin} from "../../actions/user_action"
import { useNavigate } from "react-router-dom"
import {LockOpenOutlined} from '@material-ui/icons';
import useStyle from "./style"
import Inputs from './Inputs';

export const Auth = () => {
  const classes = useStyle()
  const [passwordState, setPasswordState] = useState("password")
  const disptach = useDispatch()
  let navigate = useNavigate()
  const [authState,setAuthState] = useState({
    givenname : '', surname : '', mail : '', password : '', rpassword: ''
  }) 
  const [isSignUp,setSignUp] = useState(false)
  const handleChange = ({target}) => {

    setAuthState({...authState ,[target.name] : target.value })


  }
  const handleSubmit = (e) => {
    e.preventDefault()

    isSignUp ? disptach(userLogin(authState,"signup")) : disptach(userLogin(authState,"signin"))

    navigate("/")


  }
  const handleShowPassword = () => {
    setPasswordState(passwordState === "password" ? "text" : "password")

  }


  return (
  <Container  component="main" maxWidth="xs">
    <Paper className={classes.paper} elevation={3}>
      <Avatar className={classes.avatar} >
        < LockOpenOutlined />
      </Avatar>
      <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In" }</Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>{
            isSignUp && (
              <>
                <Inputs 
                handleChange={handleChange}
                half
                name="givenname"
                label="givenname"
                autoFocus
                type="text"
                
                />

                <Inputs 
                handleChange={handleChange}
                half
                name="surname"
                label="surname"
                
                type="text"
                
                />
                

              </>

            )}
            <Inputs 
                handleChange={handleChange}
                name="mail"
                label="mail"
                
                type="email"
                
                />

            <Inputs 
                handleChange={handleChange}
                handleShowPassword={handleShowPassword}
                name="password"
                label="Password"
                
                type={passwordState}
                
                />

            {
            isSignUp && (
              <Inputs 
              handleChange={handleChange}
              name="rpassword"
              label="Reapeat Password"
              
              type={passwordState}
              />
            )}

              <Button type="submit" fullWidth className={classes.submit} variant="contained"  color="primary" > {isSignUp ? "Sign Up" : "Sign In"} </Button>
              <Grid  container>
                  <Grid item justfiy="flex-end">

                  <Button onClick={()=>setSignUp(!isSignUp)} > {isSignUp ? "Already have an Account ? Log in then " : "You don't have an Account ? Create one now"} </Button>
                     
                      {/* <Button onClick={()=>setSignUp(!isSignUp)} fullWidth className={classes.submit} variant="contained" color="secondary" > {isSignUp ? "Already have an Account ? Log in then " : "You don't have an Account ? Create one now"} </Button> */}
                  </Grid>

              </Grid>

  
          </Grid>

            
      </form>

    </Paper>



  </Container>
  )
};


export default Auth