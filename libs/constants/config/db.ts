import * as dotenv from 'dotenv';
import { DBType } from 'libs/types';

dotenv.config();
export const DB_CONFIG = {
    type: (process.env.DB_TYPE as DBType) as any,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    entities: ['dist/**/*.entity{.ts,.js}'], // Une entité, c'est la classe Typescript de ORM qui va être l'image de votre table au niveau de la base de données. When we use the typeorm cli to generate the entities, we need to specify the entities folder
    synchronize: process.env.NODE_ENV !== 'production', // true only in development mode
  }