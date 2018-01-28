import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {createProduct} from '../actions/index';

class ProductsNew extends Component {
  render(){
    const {fields:{asin}, handleSubmit} = this.props;

    return (
      <div className="container">
        
        <h1>Find a product</h1>

        <form>
          <div className="form-group">
            <label>ASIN:</label>
            <input type="text" className="form-control" {...asin} />
          </div>
          <button type="submit" className="btn btn-success">Find</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'NewProductForm',
  fields: ['asin']
},null, {createProduct})(ProductsNew);
