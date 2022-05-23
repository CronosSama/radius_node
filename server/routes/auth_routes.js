import express from "express"
import { addUserLdap, loginLdapUser, modifyLdapUser } from "../controllers/ldap_controller.js"
import { Authentication, Authorization } from "../middleware/auth_middle.js"
const router = express.Router({
  mergeParams : true
})



//signup
router.post("/signup",addUserLdap)

// sigin
router.post("/signin",loginLdapUser)


//change info
router.patch("/modify/:sambaSID",Authorization,modifyLdapUser)


export default router;






