import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import ProductsIndex from './components/ProductsIndex';
import ProductsNew from './components/ProductsNew';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={ProductsIndex} />
    <Route path="products/new" component={ProductsNew} />
  </Route>
)
