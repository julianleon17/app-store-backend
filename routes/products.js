const express = require( 'express' );
const router = express.Router();

// Services
const ProductsServices = require( '../services/product.services' );
const services = new ProductsServices();

// Validator handler
const validatorHandler = require( '../middlewares/validator.handler' );

// Schemas
const { createProductSchema, updateProductSchema, getProductSchema } = require( '../schemas/product.schema' );

// Create Product ( POST )
router.post( '/create',
  validatorHandler( createProductSchema, 'body' ),
  async ( req, res, next ) => {
    try {
      const product = req.body;
      let statusCode = 201;
      let message = 'Created';

      await services.createProduct( product );

      res
      .status( statusCode )
      .json( {
        message: message,
        status: statusCode
      } );
    } catch ( error ) {
      next( error );
    }
  }
);

// Update Product ( PATCH )
router.patch( '/update/:id', ( req, res, next ) => {
  try {
    const body = req.body;
    const { id } = req.params;

    services.updateProduct( id, body );

    res
    .json( {
      message: 'Updated',
      status: 200,
      data: body,
      id
    } );
  } catch ( error ) {
    next( error );
  }
} );

// Delete Product ( DELETE )
router.delete( '/delete/:id', async ( req, res, next ) => {
  try {
    const { id } = req.params;
    let statusCode = 204;
    let message = 'error with delete';
    let result = await services.deleteProduct( id );

    if ( result ) {
      message = 'Deleted';
      statusCode = 200;
    }
    res
    .status( statusCode )
    .json( {
      message: message,
      status: statusCode,
      id
    } );
  } catch ( error ) {
    next( error );
  }
} );

// List Products ( GET )
router.get( '/list', async ( req, res, next ) => {
  try {
    let statusCode = 204;
    let result = await services.getProducts();

    if ( result !== false ) {
      statusCode = 200;
    }

    res
    .status( statusCode )
    .json( result );
  } catch ( error ) {
    next( error );
  }
} );

// Show Product ( GET )
router.get( '/show/:id', async ( req, res, next ) => {
  try {
    const { id } = req.params;
    let statusCode = 200;
    let product = await services.getProduct( id );

    res
    .status( statusCode )
    .json( product );
  } catch ( error ) {
    next( error );
  }
} );

module.exports = router;
