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
      <div>
        <div className="container">
          <div className="card new-card">
            <div className="card-body new-card-body">
              <div className="new-card-grad"></div>
              <div className="row d-flex align-items-center inner-padding">

                <div className="col-lg-7">
                  <h1 className="new-header">Find a product</h1>
                  <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <div className="form-group new-formgroup">
                      <label>Please provide a ASIN (e.g. B002QYW8LW) code:</label>
                      <input type="text" className="form-control" {...asin} />
                    </div>
                    <button type="submit" className="btn btn-danger find-btn btn-lg">
                      Find product
                    </button>
                  </form>
                </div>
                <div className="col-lg-5">
                  <img className="mx-auto d-block" src="https://i.imgur.com/Bmy7e4B.png" height="350"/>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="card suggestion-card">
                <div className="card-body">
                  *Beep boop* Here are some random Asins... B0049SP0AE, B00CL2H1U2, and B00E1AEERK *Beep boop*
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'NewProductForm',
  fields: ['asin']
},null, {createProduct})(ProductNew);
