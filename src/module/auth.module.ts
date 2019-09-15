import { Module } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthorModule } from './author.module';

@Module({
    imports: [AuthorModule],
    providers: [AuthService],
})
export class AuthModule {}
