import { sequelize } from '../db.js'
import { DataTypes } from 'sequelize'


export const WorkspaceSchema = sequelize.define('Workspace', {
  number_space: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  occupied: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
},
{
  timestamps: false
}
)

export default {
  WorkspaceSchema
}