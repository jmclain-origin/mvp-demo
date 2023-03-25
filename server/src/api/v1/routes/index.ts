import { Router } from 'express';
import sampleRoutes from './sample.routes';
import tarotRoutes from './tarot.routes';

const router = Router();

router.use('/', sampleRoutes);
router.use('/tarot', tarotRoutes);

export default router;
