"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksController = void 0;
const book_1 = __importDefault(require("../models/book"));
const date_1 = __importDefault(require("../models/date"));
const obligation_1 = __importDefault(require("../models/obligation"));
const max_days_1 = __importDefault(require("../models/max_days"));
const book_request_1 = __importDefault(require("../models/book_request"));
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
            let book_id = req.body.book_id;
            let returnDate = req.body.returnDate;
            console.log(id);
            console.log(username);
            console.log(book_id);
            obligation_1.default.updateOne({ 'id': id, 'kor_ime': username }, { $set: { 'razduzen': returnDate } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    book_1.default.findOne({ 'id': book_id }, (err, book) => {
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
        this.updateComment = (req, res) => {
            let comment = req.body.comment;
            console.log(comment);
            book_1.default.updateOne({ 'id': comment.id_knjige, 'komentari.kor_ime': comment.kor_ime }, { $set: { 'komentari.$.ocena': comment.ocena, 'komentari.$.tekst': comment.tekst,
                    'komentari.$.datum_vreme': comment.datum_vreme, 'komentari.$.azuriran': 'da' } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'comment_updated' });
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
        this.deleteBook = (req, res) => {
            let idB = req.body.bookId;
            book_1.default.deleteOne({ 'id': idB }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'knjiga je obrisana' });
            });
        };
        this.changeMaxDays = (req, res) => {
            let days = req.body.days;
            console.log(days);
            max_days_1.default.updateOne({ 'id': 1 }, { $set: { 'max_broj_dana': days } }, (err, resp) => {
                if (err)
                    console.log(err);
                res.json({ 'message': 'max days updated' });
            });
        };
        this.getMaxDays = (req, res) => {
            max_days_1.default.findOne({ 'id': 1 }, (err, maxDays) => {
                if (err)
                    console.log(err);
                else
                    res.json(maxDays);
            });
        };
        this.advancedSearch = (req, res) => {
            let naziv = req.body.searchObj.naziv;
            let autor = req.body.searchObj.autor;
            let zanr = req.body.searchObj.zanr;
            let izdavac = req.body.searchObj.izdavac;
            let godina_od = req.body.searchObj.godina_od;
            let godina_do = req.body.searchObj.godina_do;
            if (!naziv)
                naziv = "";
            if (!autor)
                autor = "";
            if (!izdavac)
                izdavac = "";
            if (!godina_od)
                godina_od = 0;
            if (!godina_do)
                godina_do = 999999;
            // console.log(zanr);
            // console.log(naziv);
            // console.log(autor);
            // console.log(godina_do);
            // console.log(izdavac);
            book_1.default.find({ 'naziv': { $regex: naziv }, 'autor': { $regex: autor },
                'izdavac': { $regex: izdavac }, 'godina_izdavanja': { $gte: godina_od, $lte: godina_do },
                'zanr': { $in: zanr } }, (err, books) => {
                if (err)
                    console.log(err);
                else {
                    // console.log(books);
                    res.json(books);
                }
            });
        };
        this.suggestBook = (req, res) => {
            let book = req.body.suggestion;
            book_request_1.default.find({}, (err, requests) => {
                if (err)
                    console.log(err);
                else {
                    let idR = requests.length + 1;
                    let newBook = new book_request_1.default({
                        id: idR,
                        kor_ime: book.kor_ime,
                        naziv: book.naziv,
                        autor: book.autor,
                        zanr: book.zanr,
                        izdavac: book.izdavac,
                        godina_izdavanja: book.godina_izdavanja,
                        jezik: book.jezik,
                        broj_uzimanja: 0,
                        prosecna_ocena: 0,
                        na_stanju: book.na_stanju,
                        slika: book.slika,
                        status: 'na cekanju'
                    });
                    newBook.save((err, resp) => {
                        if (err) {
                            console.log(err);
                            res.status(400).json({ "message": "error" });
                        }
                        else
                            res.json({ "message": "dodat zahtev za knjigu" });
                    });
                }
            });
        };
        this.fetchBookSuggestions = (req, res) => {
            book_request_1.default.find({}, (err, requests) => {
                if (err)
                    console.log(err);
                else
                    res.json(requests);
            });
        };
        this.acceptSuggestion = (req, res) => {
            let id = req.body.suggestion.id;
            book_request_1.default.updateOne({ 'id': id }, { $set: { 'status': 'odobren' } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "obrisan predlog za knjigu" });
            });
        };
    }
}
exports.BooksController = BooksController;
//# sourceMappingURL=books.controller.js.map