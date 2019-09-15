import {Injectable} from "@nestjs/common";
import {AuthorService} from "./author.service";
import * as bcrypt from 'bcrypt';
import {EnvService} from '../env';

const env = new EnvService().getEnv();

@Injectable()
export class AuthService {
    constructor(private readonly authorService: AuthorService) {}

    async validateUser(name: string, password: string): Promise<any> {
        const user = await this.authorService.getAuthorByName(name);
        if (user) {
            bcrypt.compare(password, user['password'], (err, res) => {
                if (!err) {
                    return {status:"ok", message:res};
                } else {
                    return {status:"error", message:err};
                }
            });
        } else {
            return {status:"error", message:user};
        }
    }
}
