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
booksRouter.route('/getMaxDays').get(
    (req, res) => new BooksController().getMaxDays(req, res)
)
booksRouter.route('/getProlongationDays').get(
    (req, res) => new BooksController().getProlongationDays(req, res)
)
booksRouter.route('/fetchBookSuggestions').get(
    (req, res) => new BooksController().fetchBookSuggestions(req, res)
)
booksRouter.route('/fetchProlongations').get(
    (req, res) => new BooksController().fetchProlongations(req, res)
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

booksRouter.route('/makeObligation').post(
    (req, res) => new BooksController().makeObligation(req, res)
)

booksRouter.route('/addComment').post(
    (req, res) => new BooksController().addComment(req, res)
)
booksRouter.route('/updateComment').post(
    (req, res) => new BooksController().updateComment(req, res)
)

booksRouter.route('/updateBook').post(
    (req, res) => new BooksController().updateBook(req, res)
)
booksRouter.route('/addBook').post(
    (req, res) => new BooksController().addBook(req, res)
)
booksRouter.route('/deleteBook').post(
    (req, res) => new BooksController().deleteBook(req, res)
)
booksRouter.route('/changeMaxDays').post(
    (req, res) => new BooksController().changeMaxDays(req, res)
)
booksRouter.route('/changeProlongationDays').post(
    (req, res) => new BooksController().changeProlongationDays(req, res)
)
booksRouter.route('/advancedSearch').post(
    (req, res) => new BooksController().advancedSearch(req, res)
)
booksRouter.route('/suggestBook').post(
    (req, res) => new BooksController().suggestBook(req, res)
)
booksRouter.route('/acceptSuggestion').post(
    (req, res) => new BooksController().acceptSuggestion(req, res)
)
booksRouter.route('/addProlongation').post(
    (req, res) => new BooksController().addProlongation(req, res)
)



export default booksRouter; 
