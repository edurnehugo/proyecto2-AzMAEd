const Joi = require('joi');
const { generateError } = require('../helpers2');

// Valida nueva entrada de categoría
const categorySchema = Joi.object().keys({
  title: Joi.string()
    .min(3)
    .max(10)
    .required()
    .error(
      generateError(
        'El campo title debe existir, ser mayor de 2 caracteres y máximo de 10',
        400
      )
    ),
});

const editCategorySchema = Joi.object().keys({
  title: Joi.string()
    .min(3)
    .max(10)
    .required()
    .error(
      generateError(
        'El campo title debe existir, ser mayor de 2 caracteres y máximo de 10',
        400
      )
    ),
});

module.exports = {
  categorySchema,
  editCategorySchema,
};
