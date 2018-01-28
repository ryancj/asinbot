import {GET_PRODUCTS} from '../actions/types';

const INITIAL_STATE = {all: [], product: null};

export default function(state = INITIAL_STATE, action){
    switch(action.type){
      case GET_PRODUCTS:
        return {...state, all: action.payload.data};
      default:
        return state;
    }
}
