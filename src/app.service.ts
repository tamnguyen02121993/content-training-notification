import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import {
  ChangePasswordDto,
  RegisterDto,
  RequestResetPasswordDto,
  ResetPasswordDto,
} from './dtos';

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService) {}

  async register(payload: RegisterDto) {
    try {
      const sendMessageInfo = await this.mailerService.sendMail({
        to: payload.email,
        from: 'noreply@nestjs.com',
        subject: '[ContentTraining] Register Account successfully!',
        template: 'register',
        context: {
          fullname: payload.fullName,
          email: payload.email,
          password: payload.password,
        },
      });

      return true;
    } catch (error) {
      console.log(error);
    }
  }

  async changePassword(payload: ChangePasswordDto) {
    try {
      const sendMessageInfo = await this.mailerService.sendMail({
        to: payload.email,
        from: 'noreply@nestjs.com',
        subject: '[ContentTraining] Change password successfully!',
        template: 'change-password',
        context: {
          email: payload.email,
        },
      });

      return true;
    } catch (error) {
      console.log(error);
    }
  }

  async requestResetPassword(payload: RequestResetPasswordDto) {
    try {
      const sendMessageInfo = await this.mailerService.sendMail({
        to: payload.email,
        from: 'noreply@nestjs.com',
        subject: '[ContentTraining] Request reset password',
        template: 'request-reset-password',
        context: {
          token: payload.token,
          email: payload.email,
          link: payload.link,
        },
      });

      return true;
    } catch (error) {
      console.log(error);
    }
  }

  async resetPassword(payload: ResetPasswordDto) {
    try {
      const sendMessageInfo = await this.mailerService.sendMail({
        to: payload.email,
        from: 'noreply@nestjs.com',
        subject: '[ContentTraining] Reset password successfully!',
        template: 'reset-password',
        context: {
          email: payload.email,
        },
      });

      return true;
    } catch (error) {
      console.log(error);
    }
  }
}
