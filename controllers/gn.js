import Member from "../models/membre.js";
import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign({ id: user.id, is_admin: user.is_admin }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const set_cookie = (res, user) => {
  const token = generateToken(user);
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const signup_member = async (req, res) => {
  const {
    matricule,
    nom,
    prenom,
    email,
    password,
    genre,
    lien_github,
    lien_linkedin,
    lien_portfolio,
    competence,
    filiere,
    is_admin,
    is_ge_tech,
  } = req.body;
  try {
    const find_user = await Member.findOne({ where: { email } });
    if (find_user) {
      return res.status(400).json({
        success: false,
        message: "Cet email est déjà utilisé",
      });
    }

    const find_matricule = await Member.findOne({ where: { matricule } });
    if (find_matricule) {
      return res.status(400).json({
        success: false,
        message: "Ce matricule est déjà utilisé",
      });
    }

    const member = await Member.create({
      matricule,
      nom,
      prenom,
      email,
      password,
      genre,
      lien_github,
      lien_linkedin,
      lien_portfolio,
      competence,
      filiere,
      is_admin: is_admin || false,
      is_ge_tech: is_ge_tech || false,
    });

    set_cookie(res, member);
    return res.status(201).json({
      success: true,
      message: `Bienvenue ${member.nom} ${member.prenom}`,
      data: member,
    });
  } catch (error) {
    console.error("Erreur signup:", error);
    res.status(500).json({
      success: false,
      message: "Erreur interne du serveur",
      error: error.message,
    });
  }
};

export const login_member = async (req, res) => {
  try {
    const { matricule, password } = req.body;
    const find_user = await Member.findOne({ where: { matricule } });
    if (!find_user) {
      return res.status(401).json({
        success: false,
        message: "Matricule incorrect",
      });
    }
    if (!find_user.is_admin) {
      return res.status(403).json({
        success: false,
        message: "Réservé aux administrateurs",
      });
    }
    if (!(await find_user.verifyPassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Mot de passe incorrect",
      });
    }

    set_cookie(res, find_user);
    return res.status(200).json({
      success: true,
      message: "Connexion réussie",
      data: find_user,
    });
  } catch (error) {
    console.error("Erreur login:", error);
    res.status(500).json({
      success: false,
      message: "Erreur interne du serveur",
      error: error.message,
    });
  }
};

export const become_admin = async (req, res) => {
  const { id } = req.body;
  try {
    const find_user = await Member.findOne({ where: { id } });
    if (!find_user) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé",
      });
    }
    await Member.update({ is_admin: true }, { where: { id } });
    const updated_user = await Member.findOne({ where: { id } });
    return res.status(200).json({
      success: true,
      message: `${updated_user.nom} est maintenant admin`,
      data: updated_user,
    });
  } catch (error) {
    console.error("Erreur become_admin:", error);
    res.status(500).json({
      success: false,
      message: "Erreur interne du serveur",
      error: error.message,
    });
  }
};

export const delete_member = async (req, res) => {
  const { id } = req.params;
  try {
    const find_user = await Member.findOne({ where: { id } });
    if (!find_user) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé",
      });
    }
    await Member.destroy({ where: { id } });
    res.status(200).json({
      success: true,
      message: `${find_user.nom} a été supprimé`,
    });
  } catch (error) {
    console.error("Erreur delete_member:", error);
    res.status(500).json({
      success: false,
      message: "Erreur interne du serveur",
      error: error.message,
    });
  }
};

export const update_member = async (req, res) => {
  const { id } = req.params;
  const image_profile = req.file ? `/uploads/${req.file.filename}` : undefined;
  try {
    const find_user = await Member.findOne({ where: { id } });
    if (!find_user) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé",
      });
    }

    await Member.update(
      { ...req.body, ...(image_profile && { image_profile }) },
      { where: { id } }
    );
    const updated_user = await Member.findOne({ where: { id } });
    set_cookie(res, updated_user);
    return res.status(200).json({
      success: true,
      message: "Profil mis à jour",
      data: updated_user,
    });
  } catch (error) {
    console.error("Erreur update_member:", error);
    res.status(500).json({
      success: false,
      message: "Erreur interne du serveur",
      error: error.message,
    });
  }
};

export const recuperation_membre = async (req, res) => {
  try {
    const members = await Member.findAll();
    return res.json({
      success: true,
      data: {
        admins: members.filter((m) => m.is_admin),
        members: members.filter((m) => !m.is_admin),
      },
    });
  } catch (error) {
    console.error("Fetch members error:", error);
    return res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

export const get_profile = async (req, res) => {
  try {
    const user = await Member.findOne({ where: { id: req.user.id } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé",
      });
    }
    res.status(200).json({
      success: true,
      message: "Profil récupéré",
      data: user,
    });
  } catch (error) {
    console.error("Erreur get_profile:", error);
    res.status(500).json({
      success: false,
      message: "Erreur interne du serveur",
      error: error.message,
    });
  }
};