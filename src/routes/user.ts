import { Router } from "express";
import { getUsers, getUsersPortal, removeUser, saveUser, updateUser } from "../controllers/userController";
import { isAuthenticated } from "../middleware/Auth/authValidate";
import { validateToken } from "../middleware/token/validateToken";

const router = Router();


router.get('/all-users', [
   isAuthenticated,
], getUsers);

router.get('/all-users-portal', getUsersPortal);
router.post('/save-user', saveUser);
router.patch('/update-user/:id', updateUser);
router.delete('/remove-user/:id', removeUser);


module.exports = router;