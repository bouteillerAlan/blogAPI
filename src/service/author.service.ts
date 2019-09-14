import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {Injectable} from '@nestjs/common';
import {AuthorInterface} from '../interface/author.interface';
import {DtoAuthor} from '../dto/author.dto';

@Injectable()
export class AuthorService {
    constructor(@InjectModel('Author') private readonly authorModel: Model<AuthorInterface>) {}

    async getAuthor(id): Promise<AuthorInterface[]> {
        return RegExp('(all)', 'g').test(id) ? this.authorModel.find().exec() : this.authorModel.find({_id: id}).exec();
    }

    async setAuthor(body: DtoAuthor): Promise<AuthorInterface> {
        const author = new this.authorModel(body);
        const error = author.validateSync();
        return error ? error : author.save();
    }

    // #todo how to validate ?
    updateAuthor(id, body: DtoAuthor): any {
        this.authorModel.updateOne({_id: id}, {$set: body}, {runValidators: true}, (err, doc) => {
            return err ? err : doc;
        });
    }

    deleteAuthor(id): object {
        return this.authorModel.deleteOne({_id: id});
    }
}
