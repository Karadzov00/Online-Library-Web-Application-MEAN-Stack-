"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("../controllers/books.controller");
const booksRouter = express_1.default.Router();
booksRouter.route('/getTop3Books').get((req, res) => new books_controller_1.BooksController().getTop3Books(req, res));
exports.default = booksRouter;
//# sourceMappingURL=books.routes.js.map