import { EmployeeSchema } from './Employees.js'
import { WorkspaceSchema } from './Workspaces.js'

export const HasOneRealtion = () => {
  try{
    WorkspaceSchema.hasOne(EmployeeSchema, {
      foreignKey: 'workspace_num',
      allowNull: true,
      onDelete: 'SET NULL',
    })
  } catch(error){
    console.log(error)
  }
}
