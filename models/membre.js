import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import bcrypt from "bcrypt";

const Member = sequelize.define(
  "members",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    matricule: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { len: [10, 50] }, // Ex. : cm-uga-23fs0295
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isIn: [["Homme", "Femme", "Autre"]] },
    },
    lien_github: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { isUrl: true },
    },
    lien_linkedin: {
      type: DataTypes.STRING,
      allowNull: true,
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
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    is_ge_tech: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    hooks: {
      beforeCreate: async (member) => {
        if (member.password) {
          member.password = await bcrypt.hash(member.password, 10);
        }
      },
      beforeUpdate: async (member) => {
        if (member.changed('password')) {
          member.password = await bcrypt.hash(member.password, 10);
        }
      },
    },
  }
);

Member.prototype.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default Member;