import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getProducts} from '../actions/index';
import {Link} from 'react-router';

class ProductsIndex extends Component {
  componentWillMount(){
    this.props.getProducts();
  }

  renderProducts(){
    if(this.props.products.length < 1){
      return (
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body justify-content-center align-items-center">
              <div className="index-nothing">
                Couldn't find anything in my database, but I'm ready when you are <i className="fa fa-smile-o"></i>!
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return this.props.products.map((product) => {
        return (
          <div className="col-lg-4" key={product.id}>
            <Link to={"products/" + product.id} className="card-link">
              <div className="card my-card">
                <div className="card-body">
                  <div className="text-center">
                    <img className="card-img" src={product.image}/>
                    <div className="card-title">
                      {product.product_name}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )
      });
    }
  }

  render(){
    return (
      <div>
        <div className="section-container">
          <div className="container">
            <div className="row d-flex align-items-center">
              <div className="col-lg-7">

                <h1 id="main-header">ASINBot</h1>
                <h4 id="sub-header">
                  A simple Asin Lookup Tool for Amazon users. Find reviews for your product with just <strong>one click</strong>!
                </h4>
                <Link to="products/new" className="btn btn-outline-light btn-lg
                main-cta">Find a product</Link>

              </div>
              <div className="col-lg-5">

                <img className="mx-auto d-block" src="https://i.imgur.com/Bmy7e4B.png" height="350"/>

              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-12"><h2 className="section-header text-center">Recently found products</h2></div>
            {this.renderProducts()}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return { products: state.products.all }
}

export default connect(mapStateToProps, {getProducts: getProducts})(ProductsIndex);
