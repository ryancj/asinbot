import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getProducts} from '../actions/index';
import {Link} from 'react-router';

class ProductsIndex extends Component {
  componentWillMount(){
    this.props.getProducts();
  }
  renderProducts(){
    return this.props.products.map((product) => {
      return (
        <li key={product.id}>
          <Link to={"products/" + product.id}>
            <h4>{product.product_name}</h4>
          </Link>
        </li>
      )
    });
  }
  render(){
    return (
      <div className="container">
        <div>
          <Link to="products/new" className="btn btn-warning">Find Product</Link>
        </div>

        Products Index
        <ul>
          {this.renderProducts()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state){
  return { products: state.products.all }
}

export default connect(mapStateToProps, {getProducts: getProducts})(ProductsIndex);
