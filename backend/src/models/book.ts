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
        }     
    }
)

// "id":"2",
// "naziv":"Atomske navike",
// "autor":"James Clear",
// "zanr":"popularna psihologija",
// "izdavac":"Laguna",
// "godina izdavanja":"2019",
// "jezik":"srpski",
// "broj uzimanja":"10", 
// "prosecna ocena":"9.2",
// "na stanju":"3"

export default mongoose.model("Book", Book, "knjige");