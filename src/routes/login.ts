import { Router } from "express";
import { index } from "../controllers/loginController";
import * as authController from '../controllers/loginController';
import { validateToken } from "../middleware/token/validateToken";


const router = Router();

router.get('/login', index);
router.post('/login-user', authController.authenticate());

module.exports = router;