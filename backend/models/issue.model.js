import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Issue = new Schema(
    {
        title: { type: String },
        resposible: { type: String },
        description: { type: String },
        severity: { type: String },
        severity: { type: String, default: 'Open' }
    }
);

export default mongoose.model('Issue', Issue);
