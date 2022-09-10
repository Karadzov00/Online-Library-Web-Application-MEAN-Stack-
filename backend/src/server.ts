import express, { Request } from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import userRouter from './routers/user.routes';
import booksRouter from './routers/books.routes';


const multer = require('multer'); 
const upload = multer({ dest: 'uploads/' });


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb'}));

interface MulterRequest extends Request {
    file: any;
}

app.post('/profile', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    console.log("usao na backend")
    console.log((req as MulterRequest).file); 
})


mongoose.connect('mongodb://localhost:27017/biblioteka')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('db connected')
})

const router = express.Router();
router.use('/users', userRouter);
router.use('/books', booksRouter);
router.use('/', userRouter);


app.use('/', router); 





app.listen(4000, () => console.log(`Express server running on port 4000`));