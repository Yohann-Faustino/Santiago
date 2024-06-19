import express from 'express';
import customersRoute from './customersRoute';
import commentsRoute from './commentsRoute';
import appointmentsRoute from './appointmentsRoute';
import authController from '../controllers/authControllers';

const router = express.Router();

router.use('/customers', customersRoute);
router.use('/comments', commentsRoute);
router.use('/appointments', appointmentsRoute);

router.post('/signup', authController.signup);

export default router;