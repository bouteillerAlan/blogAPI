import {Injectable} from '@nestjs/common';
import {AuthorService} from './author.service';
import * as bcrypt from 'bcrypt';
import {Model} from 'mongoose';
import {JwtService} from '@nestjs/jwt';
import {InjectModel} from '@nestjs/mongoose';
import {AuthorInterface} from '../interface/author.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('Author') private readonly authorModel: Model<AuthorInterface>,
        private readonly authorService: AuthorService,
        private readonly jwtService: JwtService,
    ) {}

    // check if user exist in db, if is return user
    async validateUser(name: string): Promise<any> {
        const user = await this.authorService.getAuthorByName(name);
        if (user.length !== 0) {
            return {status: true, data: user[0]};
        } else {
            return {status: false, data: 'no user with this name'};
        }
    }

    // check user and return token if user is valid
    async login(author: any) {
        const check = await this.validateUser(author.name);
        if (check.status) {
            const compare = await bcrypt.compare(author.password, check.data.password);
            if (!compare) {
                // if check is not ok
                return {status: false, message: 'bad credential'};
            } else {
                // generate jwt payload
                const payload = {name: author.name, sub: check.data._id};
                const jwt = this.jwtService.sign(payload);
                // save in db
                await this.authorModel.updateOne({_id: check.data._id}, {$set: {token: jwt}});
                // return
                return {access_token: jwt};
            }
        } else {
            return {status: false, message: 'no user found'};
        }
    }
}
