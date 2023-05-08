import { Controller, HttpCode, HttpStatus, Get, Param } from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor( private readonly songsService: SongsService ) {}

  // @HttpCode( HttpStatus.OK )
  @Get()
  findAll() {
    return this.songsService.findAll()
  }

  // @HttpCode( HttpStatus.OK )
  // @Get( ':title' )
  // findByTitle( @Param( 'title' ) title: string ) {
  //   return this.songsService.findByTitle( title )
  // }
}
