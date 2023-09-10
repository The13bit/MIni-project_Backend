import express from 'express';
import { Resultprocess, deletcollection, getallresults, uploaddataset } from '../Controller/ProcessController.js';
import singleupload from '../middleware/Multer.js';
import { auth, authorizeadmin } from '../middleware/Auth.js';



const router = express.Router();


router.route("/upload").post(auth,singleupload,uploaddataset).get(deletcollection);

router.route("/Results").get(getallresults);

router.route("/ResultProcess").post(Resultprocess)

export default router;