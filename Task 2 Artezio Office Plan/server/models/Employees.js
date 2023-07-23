import { sequelize } from '../db.js'
import { DataTypes } from 'sequelize'

export const EmployeeSchema = sequelize.define('Employee', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
  name: {
      type: DataTypes.STRING,
      allowNull: false
  },
  technology: {
      type: DataTypes.STRING,
      allowNull: false
  },
  position: {
      type: DataTypes.STRING,
      allowNull: false
  },
  employedAt: {
      type: DataTypes.DATE,
      allowNull: true
  },
  imgURL:
  {
    type: DataTypes.STRING,
    allowNull: true
  }
},
  {
      timestamps: false
  }
)

export default {
    EmployeeSchema
}

