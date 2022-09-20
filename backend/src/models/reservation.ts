import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Reservation = new Schema(
    {
        id:{
            type: Number
        },
        id_knjige:{
            type: Number
        },
        kor_ime: {
            type: String
        }
        
    }
);

export default mongoose.model("Reservation", Reservation, "rezervacije");