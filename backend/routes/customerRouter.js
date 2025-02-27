import { Router } from "express";
const router = Router();
import { wrapAsync } from '../utils/wrapAsync.js';
import { registerCust, editCust} from '../controller/custCtrl.js';
import { verifyToken } from "../middleware/authentication.js";

// cutomer register by self and auto login
router.post('/register',wrapAsync(registerCust))
  
// edit customer
  router.patch('/editUser/:id', verifyToken, wrapAsync(editCust))

  export default router;