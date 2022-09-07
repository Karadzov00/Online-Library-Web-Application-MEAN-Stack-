import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Request = new Schema(
    {
        id:{
            type: Number
        },
        kor_ime: {
            type: String
        }
        
    }
);

export default mongoose.model("Request", Request, "zahtevi");