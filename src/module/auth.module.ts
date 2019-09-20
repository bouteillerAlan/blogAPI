import { Module } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthorModule } from './author.module';
import { ConfigService } from '../conf/config.service';
import { ConfigModule } from '../conf/config.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../controller/auth.controller';
import { JwtStrategy } from '../auth/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorSchema } from '../schema/author.schema';

@Module({
    imports: [AuthorModule, ConfigModule,
        PassportModule.register({defaultStrategy: 'jwt'}),
        MongooseModule.forFeature([{ name: 'Author', schema: AuthorSchema }]), JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (env: ConfigService) => ({
            secret: env.get('secret'),
            signOptions: {expiresIn: '120s'},
        }),
        inject: [ConfigService],
    })],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
