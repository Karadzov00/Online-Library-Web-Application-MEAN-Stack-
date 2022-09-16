import mongoose from "mongoose";

const Schema = mongoose.Schema;

let maxDays = new Schema(
    {       
        id:{
            type:Number
        },
        max_broj_dana:{
            type:Number
        }

    }
);

export default mongoose.model("maxDays", maxDays, "broj_dana");