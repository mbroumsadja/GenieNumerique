import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Member = sequelize.define(
  "utilisateurs",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [2, 50] },
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [2, 50] },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isIn: [["Homme", "Femme", "Autre"]] },
    },
    lien_github: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: { isUrl: true },
    },
    lien_linkedin: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: { isUrl: true },
    },
    lien_portfolio: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { isUrl: true },
    },
    filiere: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [2, 100] },
    },
    competence: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image_profile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_admin: {
      type: DataTypes.BOOLEAN, // Changé en BOOLEAN
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

sequelize.sync({ force: false });

export default Member;