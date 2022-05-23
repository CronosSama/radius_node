import React from "react"
import './style.css';



const Home = () => {

  return (
    <>

  <section className="hero">
    <li className="background-image"></li>
    <div className="hero-content-area">
      <h1>LDAP-FREERADIUS</h1>
      {/* <h3>Click here to change your password</h3> */}
      <a href="#" className="btn">Sign in</a>
    </div>
  </section>
  
  <footer>
    <ul>
      <li><a href="#"><i className="fa fa-twitter-square fa-2x"></i></a></li>
      <li><a href="#"><i className="fa fa-facebook-square fa-2x"></i></a></li>
      <li><a href="#"><i className="fa fa-snapchat-square fa-2x"></i></a></li>
    </ul>
  </footer>
  
    </>

    
  )


}

export default Home;