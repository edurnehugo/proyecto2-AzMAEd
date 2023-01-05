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
  user_id: Joi.number()
    .min(1)
    .max(10000)
    .required()
    .error(
      generateError(
        'El campo de user_id debe existir, ser un número y ser mínimo de 1 caracter',
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
