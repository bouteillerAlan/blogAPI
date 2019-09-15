import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {Injectable} from '@nestjs/common';
import {AuthorInterface} from '../interface/author.interface';
import {DtoAuthor} from '../dto/author.dto';
import * as bcrypt from 'bcrypt';
import {EnvService} from '../env';

const env = new EnvService().getEnv();

@Injectable()
export class AuthorService {
    constructor(@InjectModel('Author') private readonly authorModel: Model<AuthorInterface>) {}

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
        body.password = await bcrypt.hash(body.password, env.bcrypt_salt);
        const author = new this.authorModel(body);
        const error = author.validateSync();
        return error ? error : author.save();
    }

    // #todo how to validate ?
    // #todo if username or pass has no change
    updateAuthor(id, body: DtoAuthor): any {
        this.authorModel.updateOne({_id: id}, {$set: body}, {runValidators: true}, (err, doc) => {
            return err ? err : doc;
        });
    }

    deleteAuthor(id): object {
        return this.authorModel.deleteOne({_id: id});
    }
}
