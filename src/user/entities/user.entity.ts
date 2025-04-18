import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { TimestampEntity } from '@/libs/entities/timestamp.entity';

@Entity('users')
export class UserEntity extends TimestampEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column({
        length:200
    })
    name:string;

    @Column({
        unique:true
    })
    email:string;

    @Column({
        length:100
    })
    firstName:string;
    @Column({length:100})
    lastName:string;
    @Column('text',{
        nullable:true
    })
    about:string;

    @Column({type:'enum', enum:['m','f']})
    gender:string;

    @Column({
        default:false
    })
    isActive:boolean;
    
}
