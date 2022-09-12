import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Obligation = new Schema(
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
        datum_zaduzivanja:{
            type: String
        },
        datum_vracanja:{
            type: String
        },
        razduzen:{
            type: String
        }
    }
);

export default mongoose.model("Obligation", Obligation, "zaduzenja");