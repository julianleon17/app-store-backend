const Joi = require( 'joi' );

const id = Joi.string();
const name = Joi.string().max( 30 );
const description = Joi.string();
const price = Joi.number().integer();

const createProductSchema = Joi.object( {
  name: name.required(),
  description: description.required(),
  price: price.required()
} );

const updateProductSchema = Joi.object( {
  name: name,
  description: description,
  price: price
} );

const getProductSchema = Joi.object( {
  id: id.required()
} );

module.exports = { createProductSchema, updateProductSchema, getProductSchema };