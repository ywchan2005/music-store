import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { NotifierModule } from './notifier/notifier.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.db_host,
      port: parseInt(process.env.db_port),
      username: process.env.db_username,
      password: process.env.db_password,
      database: process.env.db_name,
      // entities: [ Song ],
      autoLoadEntities: true,
    }),
    SongsModule,
    AuthModule,
    UsersModule,
    NotifierModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
