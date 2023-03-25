import { Router } from 'express';
import tarotController from '../controllers/tarot.controller';

const router = Router();

router.route('/').get(tarotController.getAll);
router.route('/img/:suit/:rank').get(tarotController.fetchOneImage);

export default router;
