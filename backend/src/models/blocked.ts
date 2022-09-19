import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Blocked = new Schema(
    {
        kor_ime: {
            type: String
        },
        blokiran:{
            type: String
        }
 
    }
);

export default mongoose.model("Blocked", Blocked, "blokirani");