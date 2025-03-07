import { Router } from "express";
const router = Router();
import { wrapAsync } from '../utils/wrapAsync.js';
import { addMenuItem, getMenuItem, editMenuItem, deleteMenuItem, getAllMenuItems } from "../controller/menuCtrl.js";
import { verifyToken, verifyRoles } from '../middleware/authentication.js';
import { upload } from "../config/clouldenary.js";

// add item
router.post('/add', verifyToken, verifyRoles(['admin', 'cheaf']), upload.single('image') ,wrapAsync(addMenuItem));

// edit menu
router.route('/edit/:id')
.get(wrapAsync(getMenuItem))
.put( verifyToken, verifyRoles(['admin', 'cheaf']), upload.single('image'),wrapAsync(editMenuItem))

  // Delete item
  router.delete('/delete/:id', verifyToken, verifyRoles(['admin', 'cheaf']), wrapAsync(deleteMenuItem))
 
  // Featch all item
  router.get('/list', wrapAsync(getAllMenuItems) )

export default router;