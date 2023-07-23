import { Router } from "express"
import {employees, infoEmployee, editEmployee, addEmployee} from '../controllers/employee.js'
import { parseDateToDB } from '../middleware/parseDate.js'
const router = new Router()

// Employees
router.get('/', employees)

// Info Employee
router.get('/info/:id?', infoEmployee)

// Edit Employee
router.put('/edit/:id?', parseDateToDB, editEmployee)

// Add Employee 
router.post('/add', parseDateToDB, addEmployee)

export default router