import { Injectable } from '@nestjs/common';
import { CheckData } from '../function/checkData';

@Injectable()
export class MailService {

    async checkMailData(body): Promise<any> {
        const {lastName, firstName, mail, message, checkGdpr} = body;

        // check all value
        const errorA = await CheckData(lastName, 3, 150, '[\\[\\]\\\\&~@^%!:*$€¤£µ_*/+°={}`|#²<>]', 'Unauthorized character');
        const errorB = await CheckData(firstName, 3, 150, '[\\[\\]\\\\&~@^%!:*$€¤£µ_*/+°={}`|#²<>]', 'Unauthorized character');
        const errorC = await CheckData(mail, 3, 150, '[\\[\\]\\\\&~^%!:*$€¤£µ_*/+°={}`|#²<>]', 'Unauthorized character', true);
        const errorD = await CheckData(message, 10, 250, '[]', 'Unauthorized character');
        const errorE = checkGdpr === true ? checkGdpr : false;

        // if error
        if (!errorA.status || !errorB.status || !errorC.status || !errorD.status || !errorE) {
            // return error
            return {
                status: false,
                message: `error on check value`,
                infos : {lastName : errorA, firstName : errorB, mail : errorC, message : errorD, checkGdpr : errorE},
                value: {lastName, firstName, mail, message, checkGdpr},
            };
        } else {
            // send mail and return 200
            return {
                status: true,
                message: `message send`,
                value: {lastName, firstName, mail, message, checkGdpr},
            };
        }
    }

}
