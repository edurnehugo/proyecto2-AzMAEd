const Joi = require('joi');
const { generateError } = require('../helpers');

// Valida nueva entrada en el diario
const newEntrySchema = Joi.object().keys({
  category_id: Joi.number()
    .min(1)
    .required()
    .error(
      generateError(
        'El campo category debe existir y ser mayor de 2 caracteres',
        400
      )
    ),
  text: Joi.string()
    .min(5)
    .max(10000)
    .required()
    .error(
      generateError(
        'El campo texto debe existir y ser mayor a 5 caracteres',
        400
      )
    ),

  title: Joi.string()
    .min(3)
    .max(100)
    .required()
    .error(generateError('El campo title debe existir', 400)),
  place: Joi.string()
    .min(3)
    .max(50)
    .required()
    .error(generateError('El campo place debe existir', 400)),
});

const editEntrySchema = Joi.object().keys({
  category_id: Joi.number()
    .min(1)
    .required()
    .error(
      generateError(
        'El campo category debe existir y ser mayor de 2 caracteres',
        400
      )
    ),
  text: Joi.string()
    .min(5)
    .max(10000)
    .required()
    .error(generateError('El campo text debe existir', 400)),
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
