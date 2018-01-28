import {GET_PRODUCTS} from './types';
import axios from 'axios';

const API_URL = "http://localhost:5000/api/v1"

export function getProducts(){
  const request = axios.get(`${API_URL}/products`); //Send get request to url

  return{
       type: GET_PRODUCTS,
    payload: request
  }
}
