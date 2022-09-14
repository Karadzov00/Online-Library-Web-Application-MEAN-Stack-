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
        },
        komentari:{
            type:Array
        }
    }
)

export default mongoose.model("Book", Book, "knjige"); 

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