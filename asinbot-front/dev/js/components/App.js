import React, {Component} from 'react';
import {Link} from 'react-router';

require('../../scss/style.scss');

class App extends Component{
  renderNavbar(){
    return (
      <nav className="my-navbar">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 d-flex justify-content-between">
              <Link to={"/"} className="nav-brand">
                ASINBot
              </Link>
              <Link to="products/new" className="btn btn-outline-warning secondary-cta">
                Find a product
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  render(){
    return(
      <div>
        {this.renderNavbar()}

        {this.props.children}
      </div>
    )
  }

}

export default App;
