const Joi = require('@hapi/joi');
const { generateError } = require('../helpers');

const newEntrySchema = Joi.onject().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  title: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  website: Joi.string().required(),
  notes: Joi.string(),
  password: Joi.string().required(),
});

const updateEntrySchema = Joi.onject().keys({
  title: Joi.string().required(),
  notes: Joi.string(),
  password: Joi.string(),
});

const newProjectSchema = Joi.onject().keys({
  name: Joi.string().required(),
  description: Joi.string().required(),
  members: Joi.array().items(newEntrySchema).required(),
});

const updateProjectSchema = Joi.onject().keys({
  name: Joi.string().required(),
  description: Joi.string(),
  members: Joi.array().items(updateEntrySchema).required(),
});
