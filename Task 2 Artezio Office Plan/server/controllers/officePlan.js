import { EmployeeSchema } from '../models/Employees.js'
import { WorkspaceSchema } from '../models/Workspaces.js'

// Office Plan

// Free workspaces
export const freeWorkspaces = async (req, res) => {
  try {
    const workspaces = await WorkspaceSchema.findAll({
      where: {
        occupied: false
      }
    })
    res.json(workspaces)
  } catch (error) {
    res.json({
      message: 'Ошибка поиска свободных мест',
      error: error.message
    })
  }
}

// All workspaces
export const allWorkspaces = async (req, res) => {
  try {
    const workspaces = await WorkspaceSchema.findAll()
    res.json(workspaces)
  } catch (error) {
    res.json({
      message: 'Ошибка поиска рабочих мест',
      error: error.message
    })
  }
}