import express from 'express'
import { loginUser, signupUser, forgotPassword, resetPassword } from '../controllers/user.controller.js';

const router = express.Router();


router.post('/login', loginUser)

router.post('/signup', signupUser)

router.post('/forgotPassword', forgotPassword)

router.post('/resetPassword/:id/:token', resetPassword)

// router.post('/userData', showUserData)

export default router;

