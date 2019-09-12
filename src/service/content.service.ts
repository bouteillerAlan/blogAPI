import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { ContentInterface } from '../interface/content.interface';

@Injectable()
export class ContentService {
    constructor(@InjectModel('Content') private readonly contentModel: Model<ContentInterface>) {}

    async getContent(): Promise<ContentInterface[]> {
        return this.contentModel.find().exec();
    }

    setContent(): string {
        return 'set content';
    }

    updateContent(): string {
        return 'update content';
    }

    deleteContent(): string {
        return 'delete content';
    }
}
