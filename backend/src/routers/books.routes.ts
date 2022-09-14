import express from 'express'
import { BooksController } from '../controllers/books.controller';

const booksRouter = express.Router(); 

booksRouter.route('/getTop3Books').get(
    (req, res) => new BooksController().getTop3Books(req, res)
)

booksRouter.route('/getAtomicHabits').get(
    (req, res) => new BooksController().getAtomicHabits(req, res)
)

booksRouter.route('/getRandomBook').get(
    (req, res) => new BooksController().getRandomBook(req, res)
)

booksRouter.route('/getHighestId').get(
    (req, res) => new BooksController().getHighestId(req, res)
)

booksRouter.route('/fetchAllBooks').get(
    (req, res) => new BooksController().fetchAllBooks(req, res)
)

booksRouter.route('/getBookById').post(
    (req, res) => new BooksController().getBookById(req, res)
)

booksRouter.route('/checkInsertDate').post(
    (req, res) => new BooksController().checkInsertDate(req, res)
)

booksRouter.route('/searchBooks').post(
    (req, res) => new BooksController().searchBooks(req, res)
)

booksRouter.route('/returnBook').post(
    (req, res) => new BooksController().returnBook(req, res)
)



export default booksRouter; 
