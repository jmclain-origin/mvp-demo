import { Router } from 'express';

import tarotRoutes from './tarot.routes';

const router = Router();

router.use('/tarot', tarotRoutes);

export default router;
