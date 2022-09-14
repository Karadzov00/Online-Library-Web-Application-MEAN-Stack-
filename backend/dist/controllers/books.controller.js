"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksController = void 0;
const book_1 = __importDefault(require("../models/book"));
const date_1 = __importDefault(require("../models/date"));
const obligation_1 = __importDefault(require("../models/obligation"));
class BooksController {
    constructor() {
        this.getTop3Books = (req, res) => {
            book_1.default.find().sort({ 'broj_uzimanja': -1 }).limit(3).then(books => {
                res.json(books);
                // console.log(books); 
            }).catch(err => {
                res.json(err);
            });
        };
        this.getAtomicHabits = (req, res) => {
            book_1.default.findOne({ 'naziv': 'Atomske navike' }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.getRandomBook = (req, res) => {
        };
        this.getHighestId = (req, res) => {
            book_1.default.find().sort({ 'id': -1 }).limit(1).then(book => {
                console.log("knjiga sa max id je");
                console.log(book);
                res.json(book);
            }).catch(err => {
                res.json(err);
            });
        };
        this.fetchAllBooks = (req, res) => {
            book_1.default.find({}, (err, books) => {
                if (err)
                    console.log(err);
                else
                    res.json(books);
            });
        };
        this.getBookById = (req, res) => {
            let id = req.body.id;
            // console.log(id); 
            book_1.default.findOne({ 'id': id }, (err, book) => {
                if (err)
                    console.log(err);
                else
                    res.json(book);
            });
        };
        this.checkInsertDate = (req, res) => {
            let date = req.body.date;
            date_1.default.findOne({ 'datum': date }, (err, date) => {
                if (err)
                    console.log(err);
                else {
                    if (!date) {
                        book_1.default.find({}, (err, books) => {
                            if (err)
                                console.log(err);
                            else {
                                let maxId = books.length;
                                let randomId = Math.floor(Math.random() * (maxId + 1));
                                let new_date = new date_1.default({
                                    datum: req.body.date,
                                    id_knjige: randomId
                                });
                                new_date.save((err, resp) => {
                                    if (err) {
                                        console.log(err);
                                        res.status(400).json({ "message": "error" });
                                    }
                                    else
                                        res.json(randomId);
                                });
                            }
                        });
                    }
                    else {
                        res.json(date.id_knjige);
                    }
                }
            });
        };
        this.searchBooks = (req, res) => {
            let name = req.body.name;
            let author = req.body.author;
            if (name && !author) {
                book_1.default.find({ 'naziv': { $regex: name } }, (err, books) => {
                    if (err)
                        console.log(err);
                    else
                        res.json(books);
                });
            }
            else if (!name && author) {
                book_1.default.find({ 'autor': { $regex: author } }, (err, books) => {
                    if (err)
                        console.log(err);
                    else
                        res.json(books);
                });
            }
            else if (name && author) {
                book_1.default.find({ 'naziv': { $regex: name }, 'autor': { $regex: author } }, (err, books) => {
                    if (err)
                        console.log(err);
                    else
                        res.json(books);
                });
            }
        };
        this.returnBook = (req, res) => {
            let id = req.body.id;
            obligation_1.default.updateOne({ 'id_knjige': id }, { $set: { 'razduzen': 'da' } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'uspesno_vracena' });
            });
        };
    }
}
exports.BooksController = BooksController;
//# sourceMappingURL=books.controller.js.map