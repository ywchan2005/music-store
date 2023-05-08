import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm'
import { Artist } from './artist.entity'

@Entity( { name: 'songs' } )
export class Song {
  @PrimaryGeneratedColumn( 'uuid' )
  id: string

  @Column( { type: 'varchar' } )
  title: string

  @Column( { type: 'varchar', name: 'composed_by' } )
  composedBy: string

  // @Column( { type: 'varchar', name: 'performed_by' } )
  // performedBy: string
  @ManyToMany( () => Artist )
  @JoinTable({
    name: 'performed_by',
    joinColumn: {
      name: 'song_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'artist_id',
      referencedColumnName: 'id',
    },
  })
  performedBy: Artist[]
}