import {combineReducers} from 'redux';
import ProductsReducer from './products_reducer';
import {reducer as formReducer} from 'redux-form';

const allReducers = combineReducers({
  products: ProductsReducer,
  form: formReducer
});

export default allReducers
