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

    const reviews = this.props.product.reviews;

    return (
      <div className="container">
        <h3>Product name: {this.props.product.product_name}</h3>
        <p>Avg Rating: {this.props.product.avg_rating}</p>
        <p>Total Reviews: {this.props.product.total_reviews}</p>
        <p>Asin: {this.props.product.asin}</p>

        <hr/>
        <h4>Reviews</h4>

         <div>
           {reviews.reverse().map(review => (
             <div className="review" key={review.id}>
               <h3>{review.reviewer}</h3>
               <img src={review.avatar}/>
               <h4>{review.date}</h4>
               <h5>{review.review_header}</h5>
               <p>{review.review_body}</p>
               <p>{review.type_and_verified}</p>
               <hr/>
             </div>
           ))}
         </div>

      </div>
    );
  }
}

function mapStateToProps(state){
  return { product: state.products.product };
}

export default connect(mapStateToProps, {getProduct})(ProductShow);
