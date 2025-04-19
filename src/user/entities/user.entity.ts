import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { TimestampEntity } from '@/libs/entities/timestamp.entity';

@Entity('users')
export class UserEntity extends TimestampEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column({
        type:'varchar',
        length:200
    })
    username:string;

    @Column({
        type:'varchar',
        unique:true
    })
    email:string;

    @Column({
        type:'varchar',
    })
    password:string;

    @Column({
        type:'varchar',
        length:100
    })
    firstName:string;
    @Column({type:'varchar',length:100})
    lastName:string;
    @Column('text',{
        nullable:true
    })
    about:string;

    @Column({type:'enum', enum:['m','f']})
    gender:string;

    @Column({
        type:'varchar',
        nullable:true
    })
    imageUrl:string;
    @Column({
        type:'boolean',
        default:false
    })
    isActive:boolean;
}
