// !!!
// USE THIS FILE IN DEV ONLY
// REPLACE BY .ENV FILE IN PROD
import { Injectable } from '@nestjs/common';

@Injectable()
export class EnvService {
    getEnv(): any {
        return {
            db_uri : 'localhost',
            db_port : '27017',
            db_name : 'blog',
            db_user : 'roota',
            db_pass : 'root',
            db_option : { useNewUrlParser: true },
            bcrypt_salt : 12,
        };
    }
}
