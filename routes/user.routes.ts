import express from 'express';
import { authenticateToken } from '../src/auth/authProvider';
import { addDescription, findAll, getDescriptions, login, register,deleteDescription,updateDescription,blockUser} from '../src/controllers/userController';
const router = express.Router();


router.post('/login', login);
router.post('/register', register);

// middleware to route the down assigned routes
router.use(authenticateToken);

// the following arev auth based routes from here,
router.get('/userFindAll', findAll);
router.post('/adddesc', addDescription);
router.get('/getDescriptions', getDescriptions);
router.post('/deleteUserTimeLine',deleteDescription)
router.post('/updateDescriptions', updateDescription);
router.post('/block', blockUser);

export { router as userRouter };
