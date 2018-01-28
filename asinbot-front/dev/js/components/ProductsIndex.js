import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getProducts} from '../actions/index';
import {Link} from 'react-router';

class ProductsIndex extends Component {
  componentWillMount(){
    this.props.getProducts();
  }
  render(){
    return (
      <div className="container">
        <div>
          <Link to="products/new" className="btn btn-warning">Find Product</Link>
        </div>
        
        Products Index
      </div>
    )
  }
}

export default connect(null, {getProducts: getProducts})(ProductsIndex);
