import React, { useState } from 'react';
import {Container, Grid, Paper, Avatar, Typography, Button} from "@material-ui/core"
import { uri_user, caller } from "../../api"
import { useSelector,useDispatch } from "react-redux"
import {userLogin} from "../../actions/user_action"
import { useNavigate } from "react-router-dom"
import {LockOpenOutlined} from '@material-ui/icons';
import useStyle from "./style"
import Inputs from './Inputs';

export const Password = () => {
  const classes = useStyle()
  const [passwordState, setPasswordState] = useState("password")

  const disptach = useDispatch()
  const user = useSelector(({user}) => user)

  let navigate = useNavigate()
  const [authState,setAuthState] = useState({
    password : '', new_password: ''
  }) 
  const handleChange = ({target}) => {

    setAuthState({...authState ,[target.name] : target.value })


  }
  const handleSubmit = async(e) => {
    e.preventDefault()

    await caller("patch",`${uri_user}/modify/${user.user.full_info[0].sambaSID}`,authState)

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
      <Typography variant="h5">Change Password</Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
              

            <Inputs 
                handleChange={handleChange}
                handleShowPassword={handleShowPassword}
                name="password"
                label="Password"
                
                type={passwordState}
                
                />

              <Inputs 
              handleChange={handleChange}
              name="new_password"
              label="new password"
              
              type={passwordState}
              />


              <Button type="submit" fullWidth className={classes.submit} variant="contained"  color="primary" > Change </Button>
          </Grid>

            
      </form>

    </Paper>



  </Container>
  )
};


export default Password