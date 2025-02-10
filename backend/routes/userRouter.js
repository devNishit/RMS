import passport from 'passport';
import { Router } from "express";
const router = Router();
import { wrapAsync } from '../utils/wrapAsync.js';
import { registerUser,login, editform, updateUser,deleteUser } from '../controller/userCtrl.js';


// register //this accecss only by admin and manager
router.post('/register',wrapAsync(registerUser));

// login
router.post('/login', passport.authenticate('local'), login)

// edit user //this accecss only by admin and manager
router.route('/editUser/:id')
.get(wrapAsync(editform))
.put( wrapAsync(updateUser))

  // Delete user //this accecss only by admin and manager
  router.delete('/delete',wrapAsync(deleteUser))

export default router;