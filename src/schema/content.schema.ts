import * as mongoose from 'mongoose';

export const ContentSchema = new mongoose.Schema({
    title: String,
    id_author: Number,
    id_category: Number,
    date: Date,
    content: String,
});
