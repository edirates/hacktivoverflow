import axios from 'axios';

const server = axios.create({
  baseURL: 'http://hacktivoverflow.server.edirates.xyz',
});

export default server;
