import mongoose from "mongoose";

const NotesSchema= new mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
});

const Note= mongoose.model('Note', NotesSchema);
export default Note