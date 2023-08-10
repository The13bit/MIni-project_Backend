import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

//NOTE use the following code to acess __dirname 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get('/hell', (req, res) => {
    res.send('Hello World');
    console.log("yes");
});

router.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, '../Public/index.html'));
});

export default router;