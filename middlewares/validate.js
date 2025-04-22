import { check, validationResult } from "express-validator";

const schemas = {
  login: [
    check("matricule").isString().notEmpty().withMessage("Matricule requis"),
    check("password").isString().notEmpty().withMessage("Mot de passe requis"),
  ],
  signup: [
    check("matricule").isString().isLength({ min: 10 }).withMessage("Matricule invalide"),
    check("nom").isString().isLength({ min: 2, max: 50 }).withMessage("Nom invalide"),
    check("prenom").isString().isLength({ min: 2, max: 50 }).withMessage("Prénom invalide"),
    check("email").isEmail().withMessage("Email invalide"),
    check("password").isString().isLength({ min: 6 }).withMessage("Mot de passe trop court"),
    check("genre").isIn(["Homme", "Femme", "Autre"]).withMessage("Genre invalide"),
    check("filiere").isString().isLength({ min: 2 }).withMessage("Filière invalide"),
  ],
  update: [
    check("nom").optional().isString().isLength({ min: 2, max: 50 }),
    check("prenom").optional().isString().isLength({ min: 2, max: 50 }),
    check("email").optional().isEmail(),
    check("genre").optional().isIn(["Homme", "Femme", "Autre"]),
    check("filiere").optional().isString().isLength({ min: 2 }),
  ],
  become_admin: [
    check("id").isUUID().withMessage("ID invalide"),
  ],
};

export const validate = (schema) => [
  schemas[schema],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];