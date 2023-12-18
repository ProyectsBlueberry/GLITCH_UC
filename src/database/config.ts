import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const database = 'railway';
const user = 'root';
const password = '5ceC3b4cB5b6eC54Dfe2d-c365AGF346';

const DB = new Sequelize(database, user, password, {
   host: 'roundhouse.proxy.rlwy.net',
   dialect: 'mysql',
   logging: false, 
   port: 36012
});

export default DB;