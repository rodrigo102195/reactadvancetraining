import axios from 'axios';

const mockAPI = axios.create({
  baseURL: 'https://5ec438ef628c160016e70e9d.mockapi.io/memo/positionsTable/',
})

export default mockAPI;