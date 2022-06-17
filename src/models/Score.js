import mongoose from "mongoose";

const scoreSchema = mongoose.Schema({
    name: { type: String },
    score: { type: Number },
    color: {}
})

const Score = mongoose.model('score', scoreSchema);

export default Score;