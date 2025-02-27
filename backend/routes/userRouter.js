import { Router } from "express";
const router = Router();
import { wrapAsync } from '../utils/wrapAsync.js';
import { registerUser,login, editform, updateUser,deleteUser } from '../controller/userCtrl.js';
import { verifyToken, verifyRoles } from '../middleware/authentication.js';

// register //this accecss only by admin and manager
router.post('/register', verifyToken, verifyRoles(['admin']),wrapAsync(registerUser));

// login
router.post('/login', wrapAsync(login))

// edit user //this accecss only by admin and manager
router.route('/editUser/:id')
.get(verifyToken, verifyRoles(['admin']),wrapAsync(editform))
.put( verifyToken, verifyRoles(['admin']),wrapAsync(updateUser))

  // Delete user //this accecss only by admin and manager
  router.delete('/delete', verifyToken, verifyRoles(['admin']), wrapAsync(deleteUser))

export default router;