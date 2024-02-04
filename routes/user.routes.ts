import express from 'express';
import { authenticateToken } from '../auth/authProvider';
import { findAll, login, register } from '../controllers/userController';
const router = express.Router();


router.post('/login', login);

router.post('/register', register);

// middleware to route the down assigned routes
router.use(authenticateToken);

router.get('/userFindAll', findAll);


export { router as userRouter };
