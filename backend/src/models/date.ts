import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Date = new Schema(
    {       
        datum:{
            type:String
        }

    }
);

export default mongoose.model("Date", Date, "datumi");