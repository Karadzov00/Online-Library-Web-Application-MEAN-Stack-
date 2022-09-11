import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Book = new Schema(
    {
        id:{
            type: Number
        },
        naziv:{
            type: String
        },
        autor:{
            type: String
        },
        zanr:{
            type: String
        },
        izdavac:{
            type: String
        },
        godina_izdavanja:{
            type: Number
        },
        jezik:{
            type: String
        },
        broj_uzimanja:{
            type: Number
        },
        prosecna_ocena:{
            type: Number
        },
        na_stanju:{
            type: Number
        },
        slika:{
            type:String
        }    
    }
)

export default mongoose.model("Book", Book, "knjige"); 