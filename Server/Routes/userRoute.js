import express from 'express';

import { register } from '../Controller/UserController.js';

const router = express.Router();

router.route("/register").post(register);

export default router;

