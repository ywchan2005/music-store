import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity( { name: 'artists' } )
export class Artist {
  @PrimaryGeneratedColumn( 'uuid' )
  id: string

  @Column( { type: 'varchar' } )
  name: string
}