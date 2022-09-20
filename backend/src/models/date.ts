import mongoose from "mongoose";

const Schema = mongoose.Schema;

let DateModel = new Schema(
    {       
        datum:{
            type:String
        },
        id_knjige:{
            type:Number
        }

    }
);

export default mongoose.model("Date", DateModel, "datumi");