import * as mongoose from 'mongoose';

export const AuthorSchema = new mongoose.Schema({
    name:          {type: String, required: [true, 'name is required.']},
});
