import { Router } from 'express';
import { PolicyController } from '../controllers/PolicyController';
import { authMiddleware, adminMiddleware } from '../middleware/auth';

const router = Router();

router.post('/', authMiddleware, PolicyController.createPolicy);
router.get('/user/:userId', authMiddleware, PolicyController.getUserPolicies);
router.get('/all', authMiddleware, adminMiddleware, PolicyController.getAllPolicies);

export default router;