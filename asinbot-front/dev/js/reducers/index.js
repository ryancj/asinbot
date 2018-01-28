import {combineReducers} from 'redux';
import ProductsReducer from './products_reducer';

const allReducers = combineReducers({
  products: ProductsReducer
});

export default allReducers
