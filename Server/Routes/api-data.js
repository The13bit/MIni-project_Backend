import express from 'express';
import path from 'path';
import multer from 'multer';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload',upload.single('file'), (req, res) => {
const response={
    year:req.body.year,
    sem:req.body.sem,
    branch:req.body.branch,
}
const filePath=req.file.path;

console.log(filePath);
//res.send("yesssss"+ JSON.stringify(response));

const pythonprocess=spawn('python',[path.join(__dirname,'../Scripts/script.py'),filePath]);

pythonprocess.stdout.on('data',(data)=>{
    console.log(data.toString());
    res.send(data.toString());
    
});
pythonprocess.stderr.on('data',(data)=>{
    console.log(data.toString());
    //res.send(data.toString());
});
pythonprocess.on('close',(code)=>{
    console.log(`child process close all stdio with code ${code}`);
    //res.send(`child process close all stdio with code ${code}`);
});




});

router.get('/login', (req, res) => {
    console.log('yes');
});


export default router