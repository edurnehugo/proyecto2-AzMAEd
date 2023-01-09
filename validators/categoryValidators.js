const Joi = require('joi');
const { generateError } = require('../helpers2');

// Valida nueva entrada de categoría
const categorySchema = Joi.object().keys({
  category: Joi.string()
    .min(3)
    .max(20)
    .required()
    .error(
      generateError(
        'El campo category debe existir, ser mayor de 2 caracteres y máximo de 10',
        400
      )
    ),
});

const editCategorySchema = Joi.object().keys({
  category: Joi.string()
    .min(3)
    .max(20)
    .required()
    .error(
      generateError(
        'El campo category debe existir, ser mayor de 2 caracteres y máximo de 10',
        400
      )
    ),
});

module.exports = {
  categorySchema,
  editCategorySchema,
};
