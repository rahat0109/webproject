import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './Entity/customer.entity';
import { Order } from './Entity/order.entity';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: 'ahmedadibctg@gmail.com',
          pass: 'tmzmccfausbigxwq',
        },
      },
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'postgres',
      autoLoadEntities: true,
      entities: [Customer, Order],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Customer, Order]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
