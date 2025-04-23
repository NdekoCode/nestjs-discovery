import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { TimestampEntity } from '@/libs/entities/timestamp.entity';

@Entity('books')
export class BookEntity extends TimestampEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({
        type:'varchar'
    })
    name:string;
    @Column({
        type:'varchar'
    })
    author:string;
    @Column({
        type:'text'
    })
    description:string;
}