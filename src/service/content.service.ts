import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {Injectable} from '@nestjs/common';
import {ContentInterface} from '../interface/content.interface';
import {DtoContent} from '../dto/content.dto';

@Injectable()
export class ContentService {
    constructor(@InjectModel('Content') private readonly contentModel: Model<ContentInterface>) {}

    async getContent(id): Promise<ContentInterface[]> {
        return RegExp('(all)', 'g').test(id) ? this.contentModel.find().exec() : this.contentModel.find({_id: id}).exec();
    }

    async setContent(body: DtoContent): Promise<ContentInterface> {
        const content = new this.contentModel(body);
        return content.save();
    }

    async updateContent(id, body: DtoContent): Promise<ContentInterface> {
        return this.contentModel.updateOne({_id: id}, {$set: body});
    }

    deleteContent(id): string {
        return this.contentModel.deleteOne({_id: id});
    }
}
