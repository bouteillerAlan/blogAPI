import * as mongoose from 'mongoose';

export const ContentSchema = new mongoose.Schema({
    title:          {type: String, required: [true, 'title is required.']},
    author:      {type: mongoose.Schema.ObjectId, required: [true, 'author is required.']},
    category:    {type: mongoose.Schema.ObjectId, required: [true, 'category is required.']},
    date:           {type: Date, default: new Date()},
    content:        {type: String, required: [true, 'content is required.']},
});
