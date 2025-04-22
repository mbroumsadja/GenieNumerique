import Joi from "joi";

const schemas = {
  signup: Joi.object({
    nom: Joi.string().min(2).max(50).required(),
    prenom: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    genre: Joi.string().valid("Homme", "Femme", "Autre").required(),
    lien_github: Joi.string().uri().optional(),
    lien_linkedin: Joi.string().uri().optional(),
    lien_portfolio: Joi.string().uri().optional(),
    filiere: Joi.string().min(2).max(100).required(),
    competence: Joi.string().optional(),
  }),
  login: Joi.object({
    email: Joi.string().email().required(),
    nom: Joi.string().min(2).max(50).required(),
  }),
  update: Joi.object({
    nom: Joi.string().min(2).max(50).optional(),
    prenom: Joi.string().min(2).max(50).optional(),
    email: Joi.string().email().optional(),
    genre: Joi.string().valid("Homme", "Femme", "Autre").optional(),
    lien_github: Joi.string().uri().optional(),
    lien_linkedin: Joi.string().uri().optional(),
    lien_portfolio: Joi.string().uri().optional(),
    filiere: Joi.string().min(2).max(100).optional(),
    competence: Joi.string().optional(),
  }),
  become_admin: Joi.object({
    id: Joi.string().uuid().required(),
  }),
};

export const validate = (schema) => (req, res, next) => {
  const { error } = schemas[schema].validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }
  next();
};