import express from 'express';

import { login, logout, register } from '../Controller/UserController.js';

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").get(logout);

// router.route("/me").get(auth,getUserProfile);   note to check for auth use this format 

export default router;

