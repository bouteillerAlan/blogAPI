import * as mongoose from 'mongoose';

export const CategorieSchema = new mongoose.Schema({
    name:          {type: String, required: [true, 'name is required.']},
});
