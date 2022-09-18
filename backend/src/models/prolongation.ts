import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Prolongation = new Schema(
    {
        id:{
            type: Number
        },
        kor_ime: {
            type: String
        },
        id_knjige:{
            type:Number
        },
        id_zaduzenja:{
            type: Number
        }
    }
);

export default mongoose.model("Prolongation", Prolongation, "produzenja");