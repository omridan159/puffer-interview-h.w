import express from 'express';
import { conversionRateController } from '../../modules/conversionRate';

const router = express.Router();

router.get('/', conversionRateController.getConversionRate);

export default router;
