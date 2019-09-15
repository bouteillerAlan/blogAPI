import * as mongoose from 'mongoose';

export const AuthorSchema = new mongoose.Schema({
    name:          {type: String, required: [true, 'name is required.']},
    password:      {type: String, required: [true, 'password is required.']},
    token:         {type: String, required: [true, 'token is required.']},
});
