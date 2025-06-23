import { Router } from 'express';
import { ClaimController } from '../controllers/ClaimController';
import { authMiddleware, adminMiddleware } from '../middleware/auth';

const router = Router();

router.post('/', authMiddleware, ClaimController.createClaim);
router.get('/user/:userId', authMiddleware, ClaimController.getUserClaims);
router.patch('/:claimId/status', authMiddleware, adminMiddleware, ClaimController.updateClaimStatus);

export default router;