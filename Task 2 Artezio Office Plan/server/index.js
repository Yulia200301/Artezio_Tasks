import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import fileupload from 'express-fileupload'
import { fileURLToPath } from 'url'

import { sequelize } from './db.js'
import employeeRoute from './routes/employee.js'
import officePlanRoute from './routes/officePlan.js'
import { HasOneRealtion } from './models/models.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

dotenv.config()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(fileupload({}))
app.use(express.static(path.resolve(__dirname, 'uploads')))
  
// Routes
app.use('/api/employee', employeeRoute)
app.use('/api/officePlan',officePlanRoute)

async function start() {
  try{
    await sequelize.authenticate();
    HasOneRealtion();
    await sequelize.sync();

    app.listen(PORT, () => { console.log(`localhost:${PORT}`) })

  } catch (error){
  console.log(error)
  }
}
start()

