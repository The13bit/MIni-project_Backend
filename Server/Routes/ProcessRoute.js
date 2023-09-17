import express from 'express';
import { Resultprocess, UpdateOptions, deletcollection, getallresults, uploaddataset } from '../Controller/ProcessController.js';
import singleupload from '../middleware/Multer.js';
import { auth, authorizeadmin } from '../middleware/Auth.js';



const router = express.Router();


router.route("/upload").post(auth,singleupload,uploaddataset).get(deletcollection);

router.route("/Results").post(getallresults);

router.route("/ResultProcess").post(Resultprocess)

router.route("/UpdateOptions").get(UpdateOptions)

export default router;