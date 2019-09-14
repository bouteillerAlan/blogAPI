import { Injectable } from '@nestjs/common';

@Injectable()
export class EnvService {
    getEnv(): any {
        return {
            db_uri : '172.11.111.2',
            db_port : '27017',
            db_name : 'blog',
            db_user : 'root',
            db_pass : 'root',
            db_option : { useNewUrlParser: true },
        };
    }
}
