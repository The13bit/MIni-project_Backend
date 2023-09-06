import express from 'express';
import { uploaddataset } from '../Controller/ProcessController';
import singleupload from '../middleware/Multer';


const router = express.Router();


router.route("/upload").post(singleupload,uploaddataset);

export default router;