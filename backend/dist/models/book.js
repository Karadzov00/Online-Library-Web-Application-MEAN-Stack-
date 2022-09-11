"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Book = new Schema({
    id: {
        type: Number
    },
    naziv: {
        type: String
    },
    autor: {
        type: String
    },
    zanr: {
        type: String
    },
    izdavac: {
        type: String
    },
    godina_izdavanja: {
        type: Number
    },
    jezik: {
        type: String
    },
    broj_uzimanja: {
        type: Number
    },
    prosecna_ocena: {
        type: Number
    },
    na_stanju: {
        type: Number
    },
    slika: {
        type: String
    }
});
exports.default = mongoose_1.default.model("Book", Book, "knjige");
//# sourceMappingURL=book.js.map