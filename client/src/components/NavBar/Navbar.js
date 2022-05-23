
import React,{useEffect, useState} from "react"
import { Typography, AppBar, Toolbar, Avatar, Button } from "@material-ui/core"
import { useSelector,useDispatch } from "react-redux"
import memorieImg from "../../img/logo2.png"
import memoriesText from "../../img/logo_text2.png"
import memorie_img from "../../img/memories.png"
import { Link, useLocation } from "react-router-dom"
import useStyle from "./style"
import { logOutUser } from "../../actions/user_action"
const Navbar = () => {

  const location = useLocation()
  // let user = null;
  const user = useSelector(({user}) => user)
  // const [userState,setUserState] = useState()
  // useEffect(()=>{
  //   console.log("changed")
  // },[location])
  const classes = useStyle()

  const dispatch = useDispatch()

  const Logout = () => {
    dispatch(logOutUser())

  }

  return (
      <AppBar className={classes.appBar} position="relative" color="inherit">
        <div className={classes.brandContainer}>
          {/* <Typography  component={Link} to="/" className={classes.heading} variant="h2" align="center" > Souvenir </Typography> */}
          <Link to="/" className={classes.brandContainer}>
          <img className={classes.image} src={memoriesText} alt="memories"  height="80" />
          <img className={classes.image} src={memorieImg} alt="memories"  height="80" />



          </Link>
        </div>

        <Toolbar className={classes.toolbar} >
          <Button className="button"  component={Link} to="/"  >Home</Button>
          <Button className="button" style={{marginLeft:'5px'}} component={Link} to="/change" >Change</Button>
          <Button className="button" style={{marginLeft:'5px'}} component={Link} to="/" >About</Button>

          { !!Object.keys(user.user).length ? (
            <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user.user.cn} src={user.user.image} > {user.user.image ? null : user.user.cn} </Avatar>
                <Typography className={classes.userName} variant="h6">{user.user.cn}</Typography>
                <Button variant="contained" component={Link} to="/" onClick={Logout} className={classes.logout} color="secondary" >Logout</Button>
            </div>
          ): (
            <Button className="button" component={Link} to="/auth" variant="contained" color="primary" >Sign In</Button>
          ) }

        </Toolbar>

      </AppBar> 


  )

}


export default Navbar