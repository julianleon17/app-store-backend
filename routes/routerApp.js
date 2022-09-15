const express = require( 'express' );
const examples = require( './examples' );
const products = require( './products' );
const home = require( './home' );

function router( app ) {
  const router = express.Router();
  app.use( '/api/v1', router );

  router.use( '/', home );
  router.use( '/examples', examples );
  router.use( '/products', products );
}

module.exports = router;
