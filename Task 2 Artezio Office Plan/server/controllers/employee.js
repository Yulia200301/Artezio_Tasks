import { EmployeeSchema } from '../models/Employees.js'
import { WorkspaceSchema } from '../models/Workspaces.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Employees
export const employees = async (req, res) => {
  try {
    const allEmployees = await EmployeeSchema.findAll()
    res.json(allEmployees)
  } catch (error) {
    res.json({
      message: 'Ошибка поиска сотрудников',
      error: error.message
    })
  }
}

// Info Employee
export const infoEmployee = async (req, res) => {
  try {
    const empoyeeInfo = await EmployeeSchema.findByPk(req.query.id)
    res.json(empoyeeInfo)
  } catch (error) {
    res.json({
      message: 'Ошибка поиска информации о сотруднике',
      error: error.message
    })
  }
}

// Edit Employee
export const editEmployee = async (req, res) => {
  try {
    const employeeEdit = await EmployeeSchema.findByPk(req.query.id)
    const { name, technology, position, workspace_num, employedAt } = req.body
    employeeEdit.update(
      {
        name: name,
        technology: technology,
        position: position,
        employedAt: employedAt
      }
    )

    if (employeeEdit.workspace_num != workspace_num) {

      const workspaceOld = await WorkspaceSchema.findByPk(employeeEdit.workspace_num)
      workspaceOld.update({
        occupied: false
      });

      const workspaceNew = await WorkspaceSchema.findByPk(workspace_num)
      workspaceNew.update({
        occupied: true
      });

      employeeEdit.update({
        workspace_num: workspace_num
      })
    }

    if (req.files != null) {
      const { imgURL } = req.files

      let fileName = Date.now().toString() + imgURL.name

      if (employeeEdit.imgURL) {
        const prevFilePath = path.resolve(__dirname, '..', 'uploads', employeeEdit.imgURL);
        fs.unlinkSync(prevFilePath);
      }
      await imgURL.mv(path.resolve(__dirname, '..', 'uploads', fileName))
      employeeEdit.update(
        {
          imgURL: fileName
        }
      )
    }

    res.json(employeeEdit)

  } catch (error) {
    res.json({
      message: 'Ошибка редактирования информации',
      error: error.message,
    })
  }
}

// Add Employee 
export const addEmployee = async (req, res) => {
  try {
    const { name, technology, position, workspace_num, employedAt } = req.body
    var newEmployee = new EmployeeSchema({ name, technology, position, workspace_num, employedAt })
    await newEmployee.save()
    console.log(newEmployee.technology)
    const workspace = await WorkspaceSchema.findByPk(workspace_num)
    workspace.update({
      occupied: true
    })

    if (req.files != null) {
      const { imgURL } = req.files
      let fileName = Date.now().toString() + imgURL.name
      await imgURL.mv(path.resolve(__dirname, '..', 'uploads', fileName))
      newEmployee.update({
        imgURL: fileName || ''
      })
    }

    res.json(newEmployee)

  } catch (error) {
    res.json({
      message: 'Ошибка регистрации сотрудника',
      error: error.message
    })
  }
}
