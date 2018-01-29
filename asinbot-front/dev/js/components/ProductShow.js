import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getProduct, deleteProduct} from '../actions/index';

class ProductShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount(){
    this.props.getProduct(this.props.params.id);
  }

  deleteButtonClick(){
    this.props.deleteProduct(this.props.params.id)
    .then(() => {
      this.context.router.push('/');
    });
  }

  render(){
    //When loading the product, show this in the mean time
    if(!this.props.product){
      return (
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="card please-wait-card">
                <div className="card-body justify-content-center align-items-center">
                  <div className="index-nothing text-center">
                    Please wait, finding product...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    const reviews = this.props.product.reviews;

    return (
      <div>

        <div className="container">
          <div className="card new-card">
            <div className="card-body new-card-body">
              <div className="new-card-grad"></div>
              <div className="row d-flex align-items-center inner-padding">

                <div className="col-lg-7">
                  <div className="d-flex align-items-center show-info-container">
                    <div className="show-info-group">
                      <div>Asin</div>
                      <strong>{this.props.product.asin}</strong>
                    </div>
                    <div className="show-info-group">
                      <div>Average Rating</div>
                      <strong>{this.props.product.avg_rating}</strong>
                    </div>
                    <div className="show-info-group">
                      <div>Total Reviews</div>
                      <strong>{this.props.product.total_reviews}</strong>
                    </div>
                  </div>
                  <h2 className="brand-dark">{this.props.product.product_name}</h2>
                  <button className="btn btn-warning delete-btn"
                    onClick={this.deleteButtonClick.bind(this)}>
                    <i className="fa fa-ban" aria-hidden="true"></i>
                    Delete product
                  </button>
                </div>

                <div className="col-lg-5">
                  <img src={this.props.product.image} className="mx-auto d-block"/>
                </div>
              </div>

              <div className="col-lg-12">
                <h4 className="section-header review-section-split">
                  Featured Reviews
                  <hr/>
                </h4>
              </div>

              {reviews.map(review => (
                <div className="col-lg-12" key={review.id}>
                  <div className="review" >
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="review-header-group">
                        <img src={review.avatar} className="review-avatar"/>
                        <strong>{review.reviewer}</strong>
                      </div>
                      <span className="review-date">{review.date}</span>
                    </div>
                    <hr style={{margin: "0.5em 0"}}/>
                    <div className="review-header">
                      <strong className="brand-pink">{review.rating} </strong>
                      - {review.review_header}
                    </div>
                    <p className="review-body">{review.review_body}</p>
                    <span className="review-type">{review.type_and_verified}</span>
                  </div>
                </div>
                )
              )}

            </div>
          </div>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state){
  return { product: state.products.product };
}

export default connect(mapStateToProps, {getProduct, deleteProduct})(ProductShow);
