import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './chat.entity';
import { AppGateway } from './app.gateway'
import { DataSource } from 'typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'sapassword',
      database: 'test',
      entities: [Chat],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Chat]),
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule { }
