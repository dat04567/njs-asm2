import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api/admin',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'ACcess-Origin-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});

export default instance;