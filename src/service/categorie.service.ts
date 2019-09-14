import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {Injectable} from '@nestjs/common';
import {CategorieInterface} from '../interface/categorie.interface';
import {DtoCategorie} from '../dto/categorie.dto';

@Injectable()
export class CategorieService {
    constructor(@InjectModel('Categorie') private readonly contentModel: Model<CategorieInterface>) {}

    async getCategorie(id): Promise<CategorieInterface[]> {
        return RegExp('(all)', 'g').test(id) ? this.contentModel.find().exec() : this.contentModel.find({_id: id}).exec();
    }

    async setCategorie(body: DtoCategorie): Promise<CategorieInterface> {
        const content = new this.contentModel(body);
        const error = content.validateSync();
        return error ? error : content.save();
    }

    // #todo how to validate ?
    updateCategorie(id, body: DtoCategorie): any {
        this.contentModel.updateOne({_id: id}, {$set: body}, {runValidators: true}, (err, doc) => {
            return err ? err : doc;
        });
    }

    deleteCategorie(id): object {
        return this.contentModel.deleteOne({_id: id});
    }
}
