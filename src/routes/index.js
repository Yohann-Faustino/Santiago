import express from 'express';
import customersRoute from './customersRoute';
import commentsRoute from './commentsRoute';
import appointmentsRoute from './appointmentsRoute';

const router = express.Router();

router.use('/customers', customersRoute);
router.use('/comments', commentsRoute);
router.use('/appointments', appointmentsRoute);

export default router;