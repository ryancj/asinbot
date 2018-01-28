import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import ProductsIndex from './components/ProductsIndex';
import ProductNew from './components/ProductNew';
import ProductShow from './components/ProductShow';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={ProductsIndex} />
    <Route path="products/new" component={ProductNew} />
    <Route path="products/:id" component={ProductShow} />
  </Route>
)
