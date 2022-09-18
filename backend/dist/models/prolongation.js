"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Prolongation = new Schema({
    id: {
        type: Number
    },
    kor_ime: {
        type: String
    },
    id_knjige: {
        type: Number
    },
    id_zaduzenja: {
        type: Number
    },
    novi_datum: {
        type: String
    }
});
exports.default = mongoose_1.default.model("Prolongation", Prolongation, "produzenja");
//# sourceMappingURL=prolongation.js.map