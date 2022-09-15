function logErrors( err, req, res, next ) {
  console.log( 'LogErrors:' );
  console.error( err );
  next( err );
}

function errorHandler( err, req, res, next ) {
  res
  .status( 500 )
  .json( {
    message: err.message,
    stack: err.stack
  } );
}

function boomErrorhandler( err, req, res, next ) {
  if ( err.isBoom ) {
    const { output } = err;
    res
    .status( output.statusCode )
    .json( output.payload );
  } else {
    next( err );
  }
}

module.exports = { logErrors, errorHandler, boomErrorhandler };