"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("../controllers/books.controller");
const booksRouter = express_1.default.Router();
booksRouter.route('/getTop3Books').get((req, res) => new books_controller_1.BooksController().getTop3Books(req, res));
booksRouter.route('/getAtomicHabits').get((req, res) => new books_controller_1.BooksController().getAtomicHabits(req, res));
booksRouter.route('/getRandomBook').get((req, res) => new books_controller_1.BooksController().getRandomBook(req, res));
booksRouter.route('/getHighestId').get((req, res) => new books_controller_1.BooksController().getHighestId(req, res));
booksRouter.route('/fetchAllBooks').get((req, res) => new books_controller_1.BooksController().fetchAllBooks(req, res));
booksRouter.route('/getMaxDays').get((req, res) => new books_controller_1.BooksController().getMaxDays(req, res));
booksRouter.route('/getBookById').post((req, res) => new books_controller_1.BooksController().getBookById(req, res));
booksRouter.route('/checkInsertDate').post((req, res) => new books_controller_1.BooksController().checkInsertDate(req, res));
booksRouter.route('/searchBooks').post((req, res) => new books_controller_1.BooksController().searchBooks(req, res));
booksRouter.route('/returnBook').post((req, res) => new books_controller_1.BooksController().returnBook(req, res));
booksRouter.route('/makeObligation').post((req, res) => new books_controller_1.BooksController().makeObligation(req, res));
booksRouter.route('/addComment').post((req, res) => new books_controller_1.BooksController().addComment(req, res));
booksRouter.route('/updateBook').post((req, res) => new books_controller_1.BooksController().updateBook(req, res));
booksRouter.route('/addBook').post((req, res) => new books_controller_1.BooksController().addBook(req, res));
booksRouter.route('/deleteBook').post((req, res) => new books_controller_1.BooksController().deleteBook(req, res));
booksRouter.route('/changeMaxDays').post((req, res) => new books_controller_1.BooksController().changeMaxDays(req, res));
booksRouter.route('/advancedSearch').post((req, res) => new books_controller_1.BooksController().advancedSearch(req, res));
booksRouter.route('/suggestBook').post((req, res) => new books_controller_1.BooksController().suggestBook(req, res));
exports.default = booksRouter;
//# sourceMappingURL=books.routes.js.map