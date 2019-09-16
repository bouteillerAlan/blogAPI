import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {Injectable} from '@nestjs/common';
import {ContentInterface} from '../interface/content.interface';
import {DtoContent} from '../dto/content.dto';
import {DtoContentUpdate} from '../dto/content.update.dto';

@Injectable()
export class ContentService {
    constructor(@InjectModel('Content') private readonly contentModel: Model<ContentInterface>) {}

    async getContent(id): Promise<ContentInterface[]> {
        const options = [
            {$project: {
                title: 1,
                date: 1,
                author: {name: 1},
                category: 1,
            }},
            {$lookup: {
                from: 'categories',
                localField: 'category',
                foreignField: '_id',
                as: 'category',
            }},
            {$lookup: {
                from: 'authors',
                localField: 'author',
                foreignField: '_id',
                as: 'author',
            }}];
        return RegExp('(all)', 'g').test(id) ? this.contentModel.aggregate(options) : this.contentModel.find({_id: id}).exec();
    }

    async setContent(body: DtoContent): Promise<ContentInterface> {
        const content = new this.contentModel(body);
        const error = content.validateSync();
        return error ? error : content.save();
    }

    async updateContent(id, body: DtoContentUpdate): Promise<any> {
        return this.contentModel.updateOne({_id: id}, {$set: body});
    }

    async deleteContent(id): Promise<any> {
        return await this.contentModel.deleteOne({_id: id});
    }
}
