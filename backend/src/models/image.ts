import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Image = new Schema(
    {
        id:{
            type: Number
        },
        naziv: {
            type: String
        },
        slika:{
            type:String
        }

        
    }
);

export default mongoose.model("Image", Image, "slike");