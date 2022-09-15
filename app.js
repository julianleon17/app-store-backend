const { logErrors, errorHandler, boomErrorhandler } = require( './middlewares/error.handler' );
const routerApp = require( './routes/routerApp.js' );
const express = require( 'express' );
const cors = require( 'cors' );
const app = express();
const port = process.env.PORT || 3000;

// Whitelist of origins
const whitelist = [ 'http://localhost:5173' ];
const options = {
  origin: ( origin, callback ) => {
    let originName = ( ( !origin ) ? 'Own origin' : origin );
    console.log( 'Request from: ' + originName );

    if ( whitelist.includes( origin ) || !origin ) {
      callback( null, true );
    } else {
      callback( new Error( 'Unauthorized origin' ) );
    }
  }
};

// Middleware
app.use( express.json() );
app.use( cors( options ) );

// Router
routerApp( app );

// Middleware customs
app.use( logErrors );
app.use( boomErrorhandler );
app.use( errorHandler );

app.listen( port, () => {
  console.log( 'Server listening on port ' + port );
} );
