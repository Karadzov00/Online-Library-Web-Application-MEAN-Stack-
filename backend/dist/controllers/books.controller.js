"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksController = void 0;
const book_1 = __importDefault(require("../models/book"));
class BooksController {
    constructor() {
        this.getTop3Books = (req, res) => {
        };
        this.getAtomicHabits = (req, res) => {
            book_1.default.findOne({ 'naziv': 'Atomske navike' }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
    }
}
exports.BooksController = BooksController;
//# sourceMappingURL=books.controller.js.map