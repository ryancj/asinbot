import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getProduct} from '../actions/index';

class ProductShow extends Component {
  componentWillMount(){
    this.props.getProduct(this.props.params.id);
  }

  render(){
    if(!this.props.product){
      return <div>Finding product, please wait...</div>
    }
    return (
      <div className="container">
        <h3>Product name: {this.props.product.asin}</h3>
      </div>
    );
  }
}

function mapStateToProps(state){
  return { product: state.products.product };
}

export default connect(mapStateToProps, {getProduct})(ProductShow);
