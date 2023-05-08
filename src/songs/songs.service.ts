import { Injectable } from '@nestjs/common';
import { Song } from '../models/song.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

// export type Song = any

@Injectable()
export class SongsService {
  // private readonly songs: Song[] = [ {
  //   id: '123',
  //   title: 'title',
  //   composed_by: 'composer',
  //   performed_by: 'performer',
  // } ]

  constructor(
    @InjectRepository( Song )
    private readonly songsRepository: Repository< Song >
  ) {}

  // async findOne( id: string ): Promise< Song | undefined > {
  //   return this.songs.find( song => song.id === id )
  // }

  // async findByTitle( title: string ): Promise< Song[] | undefined > {
  //   return this.songs.find( song => song.title === title )
  // }

  // async findAll(): Promise< Song[] | undefined > {
  //   return this.songs
  // }
  // async findAll(): Promise< Song[] > {
  findAll(): Promise< Song[] > {
    return this.songsRepository.find({
      relations: {
        performedBy: true,
      },
      order: {
        title: 'asc',
      }
    })
  }
}
