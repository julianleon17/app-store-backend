const mysql = require( 'mysql' );
const connection = mysql.createConnection( {
  host: 'localhost',
  user: 'root',
  password: 'coderdojo',
  database: 'app_store'
} );

// Connecting
connection.connect( ( error ) => {
  if ( error ) {
    return( console.log( 'Error: ' + error.message ) );
  }

  console.log( 'Connected to MySQL server.' );
} );

module.exports = connection;
