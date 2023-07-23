import { Sequelize } from 'sequelize'

const DB_USER_ = process.env.DB_USER
const DB_PASSWORD_ = process.env.DB_PASSWORD
const DB_HOST = process.env.DB_HOST
const DB_NAME = process.env.DB_NAME
const DB_PORT = process.env.DB_PORT

export const sequelize = new Sequelize(
    'task_2',
    'root',
    'root',
    {
      host: DB_HOST,
      port: DB_PORT,
      dialect: 'mysql'
    }
)