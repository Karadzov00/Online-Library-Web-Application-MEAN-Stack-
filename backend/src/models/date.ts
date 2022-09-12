import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Date = new Schema(
    {       
        datum:{
            type:String
        },
        id_knjige:{
            type:Number
        }

    }
);

export default mongoose.model("Date", Date, "datumi");