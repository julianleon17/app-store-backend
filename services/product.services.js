const mysqlConnection = require( '../lib/mysql-connection' );
const boom = require( '@hapi/boom' );
const util = require( 'util' );

// node native promisify
const query = util.promisify( mysqlConnection.query ).bind( mysqlConnection );

class ProductsServices {
  constructor() {
  }

  // Product creation
  async createProduct( product ) {
    // VALIDATION
    // if ( !product.hasOwnProperty( 'name' ) ) {
    //   const error = new Error( 'name is required!' );
    //   throw error;
    // } else if ( !product.hasOwnProperty( 'description' ) ) {
    //   const error = new Error( 'description is required!' );
    //   throw error;
    // } else if ( !product.hasOwnProperty( 'price' ) ) {
    //   const error = new Error( 'price is required!' );
    //   throw error;
    // }

    let mysqlQuery = 'INSERT INTO products( name, description, price ) VALUES( ';
    mysqlQuery += '"' + product.name + '", ';
    mysqlQuery += '"' + product.description + '", ';
    mysqlQuery += '"' + product.price + '"';
    mysqlQuery += ' );';

    try {
      await query( mysqlQuery );
    } catch ( err ) {
      const error = new Error( err.message );
      throw error;
    }

    return( true );
  }

  // Product creation
  async getProducts() {
    let mysqlQuery = 'SELECT * FROM products;';
    let toReturn = [];
    toReturn = JSON.parse( JSON.stringify( await query( mysqlQuery ) ) );

    return( toReturn );
  }

  // Product creation
  async getProduct( id ) {
    let products = await this.getProducts();
    let idSearch = parseInt( id );
    const product = products.filter( ( obj ) => obj.id === idSearch )[ 0 ];

    if ( !product ) { throw boom.notFound( 'Non-existing product' ) }
    return( product );
  }

  // Product creation
  updateProduct( id, key='' ) {
  }

  // Product creation
  async deleteProduct( id ) {
    let mysqlQuery = 'DELETE FROM products WHERE id = ' + id + ';';
    // let status = false;

    await this.getProduct( id );

    await query( mysqlQuery );
    // status = true;
    // if ( await this.getProduct( id ) ) {
    // }

    return( true );
  }
}

module.exports = ProductsServices;
