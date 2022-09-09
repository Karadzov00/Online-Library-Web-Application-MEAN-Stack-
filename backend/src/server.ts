import express, { Request } from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import userRouter from './routers/user.routes';


const multer = require('multer'); 

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb'}));




mongoose.connect('mongodb://localhost:27017/biblioteka')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('db connected')
})

const router = express.Router();
router.use('/users', userRouter);
router.use('/', userRouter);

app.use('/', router); 


// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
var upload = multer({ storage: storage })

interface MulterRequest extends Request {
    file: any;
}

app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const file = (req as MulterRequest).file
    if (!file) {
      const error = new Error('Please upload a file')
      return next(error)
    }
      res.send(file)
    
  })


app.listen(4000, () => console.log(`Express server running on port 4000`));