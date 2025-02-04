import mongoose from "mongoose";

const connectToMongoDB= async()=>{
    try{
await mongoose.connect("mongodb+srv://arijitkaran240:codeforinterview@cluster0.ylaan.mongodb.net/lutherman");
console.log("connected to MongoDB");

    }catch(error){
console.log("error connecting to MongoDB ", error.message);
    }
};

export default connectToMongoDB;