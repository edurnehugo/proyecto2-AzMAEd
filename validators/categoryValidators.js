const Joi = require('joi');
const { generateError } = require('../helpers');

// Valida nueva entrada de categoría
const newCategorySchema = Joi.object().keys({
  title: Joi.string()
    .min(3)
    .max(10)
    .required()
    .error(
      generateError(
        'El campo title debe existir y ser mayor de 2 caracteres',
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
        'El campo title debe existir y ser mayor de 2 caracteres',
        400
      )
    ),
});

module.exports = {
  newCategorySchema,
  editCategorySchema,
};
