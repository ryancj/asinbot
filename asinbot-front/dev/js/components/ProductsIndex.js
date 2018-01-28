import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getProducts} from '../actions/index';

class ProductsIndex extends Component {
  componentWillMount(){
    this.props.getProducts();
  }
  render(){
    return (
      <div className="container">
        Products Index
      </div>
    )
  }
}

export default connect(null, {getProducts: getProducts})(ProductsIndex);
