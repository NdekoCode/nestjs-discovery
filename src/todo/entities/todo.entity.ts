import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { TimestampEntity } from '@/libs/entities/timestamp.entity';

@Entity('todos')
export class TodoEntity extends TimestampEntity{

    @PrimaryGeneratedColumn()
    id:number;
    @Column({
        type:'varchar',
        length:200
    })
    title:string;

    @Column({
        type:'text',
        nullable:true
    })
    description:string;

    @Column({
        type:'boolean',
        default:false
    })
    isDone:boolean;
}