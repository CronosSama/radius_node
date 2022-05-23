import React from "react"
import { Container } from "@material-ui/core"
import { BrowserRouter as Router,Routes, Route , Navigate } from "react-router-dom"
import Auth from "./components/Auth/Auth"
import Navbar from "./components/NavBar/Navbar"
import Home from "./components/Home/Home"
import ChangePassword from "./components/Auth/changePassword"
import { useSelector } from "react-redux"
const App = () => {
  const userisAuthenticated = useSelector(({user}) => user.isAuthenticated)
  return (

      <Router>
        <Container maxWidth="xl" >
        <Navbar/>

        <Routes>
          <Route path="/" exact element={<Home />}/>

          <Route path="/change" exact element={<ChangePassword />} />

          <Route path="/auth" exact element={ !userisAuthenticated ? <Auth /> : <Navigate to="/" /> } />
          
        </Routes>
        </Container>

      </Router>
      

  )


}


export default App;

