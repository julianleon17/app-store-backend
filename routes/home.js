const express = require( 'express' );
const router = express.Router();

// Home
router.get( '/', ( req, res ) => {
  let response = 'Express says Hello World!';
  res.send( response );
} );

module.exports = router;
