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
    nom,
    prenom,
    email,
    genre,
    lien_github,
    lien_linkedin,
    lien_portfolio,
    competence,
    filiere,
  } = req.body;
  try {
    const find_user = await Member.findOne({ where: { email } });
    if (find_user) {
      return res.status(400).json({
        success: false,
        message: "Cet utilisateur existe déjà",
      });
    }

    const member = await Member.create({
      nom,
      prenom,
      email,
      genre,
      lien_github,
      lien_linkedin,
      lien_portfolio,
      competence,
      filiere,
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
    const { email, nom } = req.body;
    const find_user = await Member.findOne({ where: { email, nom } });
    if (!find_user) {
      return res.status(401).json({
        success: false,
        message: "Utilisateur non trouvé",
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
  const image_profile = req.file ? `/uploads/user/${req.file.filename}` : undefined;
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
  };
};

export const recuperation_membre = async (req, res) => {
  try {
    const admins = await Member.findAll({ where: { is_admin: true } });
    const members = await Member.findAll({ where: { is_admin: false } });
    res.status(200).json({
      success: true,
      message: "Membres récupérés",
      data: { admins, members },
    });
  } catch (error) {
    console.error("Erreur recuperation_membre:", error);
    res.status(500).json({
      success: false,
      message: "Erreur interne du serveur",
      error: error.message,
    });
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