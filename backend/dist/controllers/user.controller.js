"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
const image_1 = __importDefault(require("../models/image"));
const obligation_1 = __importDefault(require("../models/obligation"));
class UserController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let type = req.body.type;
            user_1.default.findOne({ 'kor_ime': username, 'lozinka': password, 'tip': type }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.findUser = (req, res) => {
            let username = req.body.username;
            user_1.default.findOne({ 'kor_ime': username }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.getNoUserImage = (req, res) => {
            image_1.default.findOne({ 'id': 1 }, (err, image) => {
                if (err)
                    console.log(err);
                else
                    res.json(image);
            });
        };
        this.register = (req, res) => {
            let user = new user_1.default({
                kor_ime: req.body.username,
                lozinka: req.body.password,
                ime: req.body.firstname,
                prezime: req.body.lastname,
                tip: req.body.type,
                adresa: req.body.address,
                telefon: req.body.phone,
                email: req.body.email,
                status: req.body.status,
                slika: req.body.image
            });
            user.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "error" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.updatePassword = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.updateOne({ 'kor_ime': username }, { $set: { 'lozinka': password } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.getObligations = (req, res) => {
            let username = req.body.username;
            obligation_1.default.find({ 'kor_ime': username }, (err, obligations) => {
                if (err)
                    console.log(err);
                else
                    res.json(obligations);
            });
        };
        this.fetchAllUsers = (req, res) => {
            user_1.default.find({}, (err, users) => {
                if (err)
                    console.log(err);
                else
                    res.json(users);
            });
        };
        this.fetchAllObligations = (req, res) => {
            obligation_1.default.find({}, (err, users) => {
                if (err)
                    console.log(err);
                else
                    res.json(users);
            });
        };
        this.addUser = (req, res) => {
            let username = req.body.user.kor_ime;
            user_1.default.updateOne({ 'kor_ime': username }, { $set: { 'status': 'odobren' } }, (err, user) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'korisnik je dodat' });
                }
            });
        };
        this.deleteUser = (req, res) => {
            let username = req.body.user.kor_ime;
            user_1.default.deleteOne({ 'kor_ime': username }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'korisnik je obrisan' });
            });
        };
        this.updateUser = (req, res) => {
            let kor_ime = req.body.user.kor_ime;
            let lozinka = req.body.user.lozinka;
            let ime = req.body.user.ime;
            let prezime = req.body.user.prezime;
            let tip = req.body.user.tip;
            let adresa = req.body.user.adresa;
            let telefon = req.body.user.telefon;
            let email = req.body.user.email;
            let status = req.body.user.status;
            let slika = req.body.user.slika;
            user_1.default.updateOne({ 'kor_ime': kor_ime }, { $set: { 'lozinka': lozinka, 'ime': ime,
                    'prezime': prezime, 'tip': tip, 'adresa': adresa, 'telefon': telefon,
                    'email': email, 'status': status, 'slika': slika } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'korisnik azuriran' });
            });
        };
        this.getAdmin = (req, res) => {
            user_1.default.findOne({ 'tip': 'admin' }, (err, admin) => {
                if (err)
                    console.log(err);
                else
                    res.json(admin);
            });
        };
        this.upgradePrivilege = (req, res) => {
            let user = req.body.user;
            user_1.default.updateOne({ 'kor_ime': user.kor_ime }, { $set: { 'tip': 'moderator' } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'privilegije povecane' });
            });
        };
        this.downgradePrivilege = (req, res) => {
            let user = req.body.user;
            user_1.default.updateOne({ 'kor_ime': user.kor_ime }, { $set: { 'tip': 'citalac' } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'privilegije smanjene' });
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map