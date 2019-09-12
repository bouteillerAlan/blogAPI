import * as mongoose from 'mongoose';

export const ContentSchema = new mongoose.Schema({
    title: String,
    id_author: String,
    id_category: String,
    date: Date,
    content: String,
});
