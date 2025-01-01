import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";


const User =  sequelize.define('User',{
    nom:{
        type: DataTypes.STRING,
        allownull: false,
        unique:true,
    },
    prenom:{
        type: DataTypes.STRING,
        allownull:false,
    },
    email:{
        type: DataTypes.STRING,
        allownull:false,
        unique: true,
        validate:{
            isEmail: true,
        }
    },
    lienGithub:{
        type: DataTypes.STRING,
        allownull:false,
        unique: true,
    },
    lienLinkin:{
        type: DataTypes.STRING,
        allownull:false,
        unique: true,
    },
    formation:{
        type: DataTypes.STRING,
        allownull:false,
    },
    proffetion:{
        type: DataTypes.STRING,
        allownull:false,
    },
    lienProfile:{
        type: DataTypes.STRING,
        allownull:false,
    }

},{
    timestamps: true,
});

// const creationTable  =  sequelize.sync().then(() =>{
//     console.log("les tables ont été creés avec succces")
// }).catch((Error) =>{
//       console.log("il ya une erreur lors de la creation de tables")
// });

export default User;