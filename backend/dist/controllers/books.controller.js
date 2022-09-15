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
            let username = req.body.username;
            console.log(username);
            console.log(id);
            obligation_1.default.updateOne({ 'id_knjige': id, 'kor_ime': username }, { $set: { 'razduzen': 'da' } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    book_1.default.findOne({ 'id': id }, (err, book) => {
                        if (err)
                            console.log(err);
                        else {
                            let na_stanju = book.na_stanju + 1;
                            book_1.default.updateOne({ 'id': book.id }, { $set: { 'na_stanju': na_stanju } }, (err, resp) => {
                                if (err)
                                    console.log(err);
                                else
                                    res.json({ 'message': 'uspesno_vracena' });
                            });
                        }
                    });
                }
            });
        };
        this.makeObligation = (req, res) => {
            obligation_1.default.find({}, (err, obligs) => {
                if (err)
                    console.log(err);
                else {
                    let idO = obligs.length + 1;
                    let obligation = new obligation_1.default({
                        id: idO,
                        kor_ime: req.body.obligation.kor_ime,
                        id_knjige: req.body.obligation.id_knjige,
                        datum_zaduzivanja: req.body.obligation.datum_zaduzivanja,
                        datum_vracanja: req.body.obligation.datum_vracanja,
                        razduzen: req.body.obligation.razduzen
                    });
                    console.log(obligation);
                    obligation.save((err, resp) => {
                        if (err) {
                            console.log(err);
                            res.status(400).json({ "message": "error" });
                        }
                        else {
                            book_1.default.findOne({ 'id': req.body.obligation.id_knjige }, (err, book) => {
                                if (err)
                                    console.log(err);
                                else {
                                    let na_stanju = book.na_stanju - 1;
                                    let broj_uzimanja = book.broj_uzimanja + 1;
                                    book_1.default.updateOne({ 'id': book.id }, { $set: { 'na_stanju': na_stanju, 'broj_uzimanja': broj_uzimanja } }, (err, resp) => {
                                        if (err)
                                            console.log(err);
                                        else
                                            res.json({ "message": "obligation_added" });
                                    });
                                }
                            });
                        }
                    });
                }
            });
        };
        this.addComment = (req, res) => {
            let comment = req.body.comment;
            console.log(comment);
            book_1.default.updateOne({ 'id': comment.id_knjige }, { $push: { 'komentari': comment } }, (err, book) => {
                if (err)
                    console.log(err);
                else {
                    book_1.default.findOne({ 'id': comment.id_knjige }, (err, book) => {
                        if (err)
                            console.log(err);
                        else {
                            let ratings = book.komentari.length;
                            console.log(ratings);
                            let rating = ((book.prosecna_ocena + comment.ocena) / ratings);
                            console.log(rating);
                            book_1.default.updateOne({ 'id': comment.id_knjige }, { $set: { 'prosecna_ocena': rating } }, (err, resp) => {
                                if (err)
                                    console.log(err);
                                res.json({ 'message': 'comment_added' });
                            });
                        }
                    });
                }
            });
        };
        this.updateBook = (req, res) => {
            let book = req.body.book;
            book_1.default.updateOne({ 'id': book.id }, { $set: { 'naziv': book.naziv, 'autor': book.autor, 'zanr': book.zanr,
                    'izdavac': book.izdavac, 'godina_izdavanja': book.godina_izdavanja, 'jezik': book.jezik,
                    'broj_uzimanja': book.broj_uzimanja, 'prosecna_ocena': book.prosecna_ocena,
                    'na_stanju': book.na_stanju, 'slika': book.slika } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'book_updated' });
            });
        };
        this.addBook = (req, res) => {
            book_1.default.find({}, (err, books) => {
                if (err)
                    console.log(err);
                else {
                    let new_id = books.length + 1;
                    let newBook = new book_1.default({
                        id: new_id,
                        naziv: req.body.book.naziv,
                        autor: req.body.book.autor,
                        zanr: req.body.book.zanr,
                        izdavac: req.body.book.izdavac,
                        godina_izdavanja: req.body.book.godina_izdavanja,
                        jezik: req.body.book.jezik,
                        broj_uzimanja: req.body.book.broj_uzimanja,
                        prosecna_ocena: req.body.book.prosecna_ocena,
                        na_stanju: req.body.book.na_stanju,
                        slika: req.body.book.slika
                    });
                    newBook.save((err, resp) => {
                        if (err) {
                            console.log(err);
                            res.status(400).json({ "message": "error" });
                        }
                        else
                            res.json({ "message": "book_added" });
                    });
                }
            });
        };
    }
}
exports.BooksController = BooksController;
//# sourceMappingURL=books.controller.js.map