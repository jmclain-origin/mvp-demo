import { Router } from 'express';
import tarotController from '../controllers/tarot.controller';

const router = Router();

router.route('/').get(tarotController.getAllNew);

router.route('/draw').get(tarotController.getByCount);

router.route('/img/:suit/:rank').get(tarotController.sendNewImage);

export default router;
