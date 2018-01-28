import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {createProduct} from '../actions/index';

class ProductNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  onSubmit(props){
    this.props.createProduct(props)
      .then(() => {
        this.context.router.push('/');
      });
  }

  render(){
    const {fields:{asin}, handleSubmit} = this.props;

    return (
      <div className="container">

        <h1>Find a product</h1>

        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div className="form-group">
            <label>ASIN (For example - B002QYW8LW):</label>
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
},null, {createProduct})(ProductNew);
