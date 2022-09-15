const express = require( 'express' );
const router = express.Router();

// Index of products
router.get( '/', ( req, res ) => {
  let response = 'List of products!';
  res.send( response );
} );

// Optional params
router.get( '/optional', ( req, res ) => {
  const { name='express' } = req.query;
  let response = '';

  response += 'Optional: </br>'
  response += 'Express says: "Hello, ' + name + '"';

  res.send( response );
} );

// Required params
router.get( '/required/:name/:age', ( req, res ) => {
  const { name, age } = req.params;
  let response = {
    name,
    age
  };

  res.json( response );
} );

module.exports = router;
