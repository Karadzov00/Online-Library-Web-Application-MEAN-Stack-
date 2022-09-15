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
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map