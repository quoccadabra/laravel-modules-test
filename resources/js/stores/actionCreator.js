import axios from 'axios';
import _ from 'lodash';

const RESOURCE_AUTH = '/api/';

const RESOURCE_USER = '/api/users';
const login = async (data) => {
  if (data && !_.isUndefined(data.username) && !_.isUndefined(data.password)) {
    const response = await axios.post(RESOURCE_AUTH + "login", data);
    return response.data 
  }
}

const getUsers = async (params = null) => {
  let url = `${RESOURCE_USER}`
  if (params) {
    url = `${url}?${params}`
  }
  const response = await axios.get(url);
  return response.data;
}
const storeUser = async (body) => {
  let url = `${RESOURCE_USER}`;
  const response = await axios.post(url, body);
  return response.data;
}
const updateUser = async (body) => {
  const id = body.id;
  let url = `${RESOURCE_USER}/${id}`;
  const response = await axios.put(url, body);
  return response.data;
}
const destroyUser = async (body) => {
  const id = body.id;
  let url = `${RESOURCE_USER}/${id}`;
  const response = await axios.delete(url);
  return response.data;
}
export default {
  login,
  getUsers,
  storeUser,
  updateUser,
  destroyUser
}