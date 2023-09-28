import { Controller } from '@nestjs/common';
import { MAIL_PATTERNS } from './common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { RegisterDto, RequestResetPasswordDto, ResetPasswordDto } from './dtos';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern(MAIL_PATTERNS.REGISTER)
  register(@Payload() payload: RegisterDto) {
    return this.appService.register(payload);
  }

  @EventPattern(MAIL_PATTERNS.CHANGE_PASSWORD)
  changePassword(@Payload() payload: any) {
    return this.appService.changePassword(payload);
  }

  @EventPattern(MAIL_PATTERNS.REQUEST_RESET_PASSWORD)
  requestResetPassword(@Payload() payload: RequestResetPasswordDto) {
    return this.appService.requestResetPassword(payload);
  }

  @EventPattern(MAIL_PATTERNS.RESET_PASSWORD)
  resetPassword(@Payload() payload: ResetPasswordDto) {
    return this.appService.resetPassword(payload);
  }
}
