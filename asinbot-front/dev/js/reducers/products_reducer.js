import {GET_PRODUCTS, GET_PRODUCT} from '../actions/types';

const INITIAL_STATE = {all: [], product: null};

export default function(state = INITIAL_STATE, action){
    switch(action.type){
      case GET_PRODUCTS:
        return {...state, all: action.payload.data};
      case GET_PRODUCT:
        return {...state, product: action.payload.data};
      default:
        return state;
    }
}
