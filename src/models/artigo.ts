import { DataTypes } from "sequelize"
import { sequelize } from "../database/sequelize"

export const Artigo = sequelize.define("Artigo", {
  banner: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
})
