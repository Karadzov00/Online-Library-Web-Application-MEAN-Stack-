import express from 'express'
import { BooksController } from '../controllers/books.controller';

const booksRouter = express.Router(); 

booksRouter.route('/getTop3Books').get(
    (req, res) => new BooksController().getTop3Books(req, res)
)
booksRouter.route('/getAtomicHabits').get(
    (req, res) => new BooksController().getAtomicHabits(req, res)
)

export default booksRouter; 
