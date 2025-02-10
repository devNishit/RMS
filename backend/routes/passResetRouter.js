import {wrapAsync} from '../utils/wrapAsync.js';
import { Router } from "express";
const router = Router();
import { forgotPass , resetToken, resetPass} from '../controller/passResetCtrl.js';

// fogot pass
router.post('/forgot',wrapAsync(forgotPass));

  router.route('/reset/:token')
  .get( wrapAsync(resetToken))
  .post( wrapAsync(resetPass))

export default router;