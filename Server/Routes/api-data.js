import express from 'express';
import path from 'path';
import multer from 'multer';
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload',upload.single('file'), (req, res) => {
const response={
    year:req.body.year,
    sem:req.body.sem,
    branch:req.body.branch,
}
console.log(response);
res.send("yesssss"+ JSON.stringify(response));
    
});
router.get('/login', (req, res) => {
    console.log('yes');
});


export default router