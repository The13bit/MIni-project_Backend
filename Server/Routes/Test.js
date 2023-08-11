import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {spawn } from 'child_process';

//NOTE use the following code to acess __dirname 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
//Remove in the future
router.get('/hell', (req, res) => {
    res.send('Hello World');
    console.log("yes");
});
//Remove in the future
router.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, '../Public/index.html'));
});

//Remove in the future
router.get('/command', (req, res) => {

    const child =spawn('python',[path.join(__dirname, '../Public/ello.py')]);

    child.stdout.on('data', (data) => {
        console.log(`child stdout:\n${data}`);
        res.send(data);
    });
    child.stderr.on('data', (data) => {
        console.error(`child stderr:\n${data}`);
    });
    child.on('exit', function (code, signal) {
        console.log('child process exited with ' +
                    `code ${code} and signal ${signal}`);
    });
});

export default router;