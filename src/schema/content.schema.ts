import * as mongoose from 'mongoose';

export const ContentSchema = new mongoose.Schema({
    title: {type: String, required: [true, 'title is required.']},
    id_author: {type: String, required: [true, 'author is required.']},
    id_category: {type: String, required: [true, 'category is required.']},
    date: {type: Date, default: new Date()},
    content: {type: String, required: [true, 'content is required.']},
});
