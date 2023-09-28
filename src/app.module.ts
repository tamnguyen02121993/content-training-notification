import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          transport: {
            host: configService.get('MAILTRAP_HOST'),
            port: configService.get<number>('MAILTRAP_PORT'),
            auth: {
              user: configService.get('MAILTRAP_USER'),
              pass: configService.get('MAILTRAP_PASSWORD'),
            },
          },
          defaults: {
            from: '"No Reply" <no-reply@content-training>',
          },
          template: {
            dir: __dirname + '/templates',
            adapter: new PugAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'templates'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
