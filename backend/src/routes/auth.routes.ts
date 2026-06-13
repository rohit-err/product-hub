import { Router } from 'express';
import { signup, login, getProfile } from '../controllers/auth.controller';
import { signupSchema, loginSchema } from '../validators/auth.validator';
import validate from '../middleware/validate';
import auth from '../middleware/auth';

const router = Router();

router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);
router.get('/profile', auth, getProfile);

export default router;
