import {Router} from 'express'
import {getCurrentUser, login, logout, register} from "../controllers/authController.js";
import {validateLoginInput, validateRegisterInput} from "../middleware/validationMiddleware.js";
import {authenticateUser} from "../middleware/authMiddleware.js";

const router = Router()

router.post('/register',validateRegisterInput,register)
router.post('/login',validateLoginInput, login)
router.get('/logout',logout)
router.get('/current-user',authenticateUser, getCurrentUser)

export default router

