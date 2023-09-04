import express from 'express';
import path from 'path';
import multer from 'multer';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage=multer.diskStorage({

    destination:function(req,file,cb){
        cb(null,'uploads/');
    },
    filename:function(req,file,cb){
        const originalname=path.parse(file.originalname).name;
        //const uniqesuffix=Date.now()+'-';   //for unique file name
        const customfilename=`${req.body.year}-${req.body.sem}-${req.body.branch}-${originalname}${path.extname(file.originalname)}`;
        cb(null,customfilename);
    }

});

const router = express.Router();
const upload = multer({ storage: storage });

//main handel route
router.post('/upload',upload.single('file'), (req, res) => {
const response={
    year:req.body.year,
    sem:req.body.sem,
    branch:req.body.branch,
}
const filePath=req.file.path;

console.log(filePath);
//res.send("yesssss"+ JSON.stringify(response));

const pythonprocess=spawn('python',[path.join(__dirname,'../Scripts/script.py'),filePath,response.year,response.sem,response.branch]);

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


//get file route
router.get('/download/:year/:sem/:branch', (req, res) => {
    console.log('hit')
    const year=req.params.year;
    const sem=req.params.sem;
    const branch=req.params.branch;

    const folderpath=path.join(__dirname,'../processed_data')
    res.download(folderpath+`/${year}_${sem}_${branch}.csv`)
   
     




});

//test router to check if button works
router.post('/test', (req, res) => {
    console.log('hit')
    res.send('tests');
    res.send("sdadad")
});


export default router