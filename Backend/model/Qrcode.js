import mongoose from "mongoose";

const Qrschema = new mongoose.Schema({

    QrCode:{
        type:String,
        required:true
    }

})

const Qrmodel = mongoose.model("Qrmodel", Qrschema);
export default Qrmodel