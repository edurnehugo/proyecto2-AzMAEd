const Joi = require('@hapi/joi');
const { generateError } = require('../helpers');

// Valida nueva entrada en el diario
const newEntrySchema = Joi.object().keys({
  category: Joi.string()
    .min(3)
    .max(100)
    .required()
    .error(
      generateError(
        'El campo category debe existir y ser mayor de 2 caracteres',
        400
      )
    ),
  text: Joi.string().max(10000),
  title: Joi.string()
    .min(3)
    .max(100)
    .required()
    .error(generateError('El campo title debe existir', 400)),
});

const editEntrySchema = Joi.object().keys({
  category: Joi.string()
    .min(3)
    .max(100)
    .required()
    .error(
      generateError(
        'El campo category debe existir y ser mayor de 2 caracteres',
        400
      )
    ),
  text: Joi.string().max(10000),
  title: Joi.string()
    .min(3)
    .max(100)
    .required()
    .error(generateError('El campo title debe existir', 400)),
});

module.exports = {
  newEntrySchema,
  editEntrySchema,
};
