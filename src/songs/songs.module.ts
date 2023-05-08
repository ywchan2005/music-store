import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from 'src/models/song.entity';
import { Artist } from 'src/models/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Song, Artist])],
  providers: [SongsService],
  controllers: [SongsController],
  exports: [SongsService],
})
export class SongsModule {}
