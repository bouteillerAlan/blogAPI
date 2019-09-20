import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {Injectable} from '@nestjs/common';
import {CategoriesInterface} from '../interface/categories.interface';
import {DtoCategories} from '../dto/categories.dto';
import {DtoCategoriesUpdate} from '../dto/categories.update.dto';

@Injectable()
export class CategoriesService {
    constructor(@InjectModel('Categories') private readonly contentModel: Model<CategoriesInterface>) {}

    async getCategoriesById(id): Promise<CategoriesInterface[]> {
        return RegExp('(all)', 'g').test(id) ? this.contentModel.find().exec() : this.contentModel.find({_id: id}).exec();
    }

    async getCategoriesByName(name): Promise<CategoriesInterface[]> {
        return RegExp('(all)', 'g').test(name) ? this.contentModel.find().exec() : this.contentModel.find({name: name}).exec();
    }

    async setCategories(body: DtoCategories): Promise<CategoriesInterface> {
        const content = new this.contentModel(body);
        const error = content.validateSync();
        return error ? error : content.save();
    }

    async updateCategories(id, body: DtoCategoriesUpdate): Promise<any> {
        this.contentModel.updateOne({_id: id}, {$set: body});
    }

    async deleteCategories(id): Promise<any> {
        return await this.contentModel.deleteOne({_id: id});
    }
}
