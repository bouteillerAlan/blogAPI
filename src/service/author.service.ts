import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {Injectable} from '@nestjs/common';
import {AuthorInterface} from '../interface/author.interface';
import {DtoAuthor} from '../dto/author.dto';
import {DtoAuthorUpdate} from '../dto/author.update.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '../conf/config.service';

@Injectable()
export class AuthorService {
    private env: any;

    constructor(env: ConfigService, @InjectModel('Author') private readonly authorModel: Model<AuthorInterface>) {
        this.env = env;
    }

    async getAuthorById(id): Promise<AuthorInterface[]> {
        return RegExp('(all)', 'g').test(id) ? this.authorModel.find().exec() : this.authorModel.find({_id: id}).exec();
    }

    async getAuthorByName(name): Promise<AuthorInterface[]> {
        return RegExp('(all)', 'g').test(name) ? this.authorModel.find().exec() : this.authorModel.find({name}).exec();
    }

    // !!! here i consider that password is encrypted with bcrypt in front
    async setAuthor(body: DtoAuthor): Promise<AuthorInterface> {
        const author = new this.authorModel(body);
        const error = author.validateSync();
        return error ? error : author.save();
    }

    // !!! encrypt the password
    // !!! DO NOT USE IN PROD (cause : man in the middle!)
    async setAuthorEncrypted(body: DtoAuthor): Promise<AuthorInterface> {
        const author = new this.authorModel(body);
        author.password = await bcrypt.hash(body.password, this.env.get('bcrypt_salt'));
        const error = author.validateSync();
        return error ? error : author.save();
    }

    // check in front if username or pass has not changed
    async updateAuthor(id, body: DtoAuthorUpdate): Promise<any> {
        return await this.authorModel.updateOne({_id: id}, {$set: body});
    }

    async deleteAuthor(id): Promise<any> {
        return await this.authorModel.deleteOne({_id: id});
    }
}
