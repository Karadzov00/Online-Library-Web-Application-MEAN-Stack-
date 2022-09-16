"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let BookRequest = new Schema({
    id: {
        type: Number
    },
    kor_ime: {
        type: String
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
    },
    status: {
        type: String
    }
});
exports.default = mongoose_1.default.model("BookRequest", BookRequest, "zahtevi_knjige");
//     id:number;
//     naziv:string;
//     autor:string;
//     zanr:string;
//     izdavac:string;
//     godina_izdavanja:number;
//     jezik:string;
//     broj_uzimanja:number;
//     prosecna_ocena:number; 
//     na_stanju: number; 
//     slika: string; 
//# sourceMappingURL=book_request.js.map