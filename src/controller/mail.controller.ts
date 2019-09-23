import {Controller, UseGuards, Post, Body} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {MailerService} from '@nest-modules/mailer';
import {DtoMail} from '../dto/mail.dto';
import {MailService} from '../service/mail.service';

// @UseGuards(AuthGuard('jwt'))
@Controller('mailer')
export class MailController {
    constructor(private readonly mailService: MailService, private readonly mailerService: MailerService) {}

    @Post('/test')
    async mailer(@Body() body: DtoMail): Promise<any> {
        const data = await this.mailService.checkMailData(body);

        if (!data.status) {
            return data;
        } else {
            return await this.mailerService.sendMail({
                to: 'bouteiller.alan@gmail.com', // sender address
                subject: 'Testing Nest MailerModule ✔', // Subject line
                template: 'template', // The `.pug` or `.hbs` extension is appended automatically.
                context: {  // Data to be sent to template engine.
                    firstName: data.value.firstName,
                    lastName: data.value.lastName,
                    mail: data.value.mail,
                    message: data.value.message,
                    checkGdpr: data.value.checkGdpr,
                },
            });
        }
    }

}
