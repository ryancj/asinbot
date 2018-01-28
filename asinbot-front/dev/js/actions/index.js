import {GET_PRODUCTS, GET_PRODUCT, CREATE_PRODUCT} from './types';
import axios from 'axios';

const API_URL = "http://localhost:5000/api/v1"

export function getProducts(){
  const request = axios.get(`${API_URL}/products`); //Send get request to url

  return{
       type: GET_PRODUCTS,
    payload: request
  }
}

export function createProduct(props){
  const request = axios.post(`${API_URL}/products`, props); //Send get request to url

  return{
       type: CREATE_PRODUCT,
    payload: request
  }
}

export function getProduct(props){
  const request = axios.get(`${API_URL}/products/${id}`); //Send get request to url

  return{
       type: GET_PRODUCT,
    payload: request
  }
}
