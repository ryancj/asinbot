import React, {Component} from 'react';

class ProductShow extends Component {

  render(){
    return (
      <div className="container">
        <h3>Product name: {this.props.params.asin}</h3>
      </div>
    );
  }
}

export default ProductShow;
