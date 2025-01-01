import User from "../models/user.js";

export const saveUser = async (req, res , next) =>{
    try {
        const lienProfile =req.file.path ;
        const {nom, prenom , email, lienGithub, lienLinkin , formation , proffetion } = req.body
        console.log(nom, prenom , email, lienGithub, lienLinkin , formation , proffetion , lienProfile)
        const user =  await User.create({nom, prenom , email, lienGithub, lienLinkin , formation , proffetion ,lienProfile});   
        res.redirect('/');
        return
    
    } catch (error) {
        
        console.log(`erreur lors de l'enregistrement`,error)
    }
};

export  const allUser = async (req, res )=>{
    const data = User.findAll();
    return data;
};
