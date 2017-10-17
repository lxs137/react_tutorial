import axios from 'axios';

// 本地node.js服务器，4000端口被占用时，端口号+1依次类推
const URL = 'http://localhost:4000'

const RandomUserURL = 'https://randomuser.me/api';

export default class API {
  // axios返回的是一个promise对象
  static get(url, param) {
    return axios.get(url, {
      params: param
    }).then((res) => res.data);
  }
  static post(url, data) {
    return axios.post(url, data).then((res) => res.data);
  }
  static put(url, data) {
    return axios.put(url, data).then((res) => res.data);
  }
  static delete(url) {
    return axios.delete(url).then((res) => res.data);
  }
  // 从randomuser上获取到随机的用户信息，插入到后端mongodb数据库中
  static autoAddTestData(limit) {
    return this.get(RandomUserURL, { 
      results: limit 
    }).then((data) => {
      let userList = data.results;
      let add_promises = userList.map((user) => {
        return this.addUser({
          name: user.name.first + " " + user.name.last,
          gender: user.gender,
          role: 'guest',
          phone: user.phone
        });
      });
      return Promise.all(add_promises);
    });
  }
  
  static getUsers(query) {
    return this.get(URL + '/users', query);
  }
  static addUser(user_info) {
    return this.post(URL + '/user', user_info);
  }
  static updateUser(_id, user_info) {
    return this.put(URL + '/user/' + _id, user_info);
  }
  static removeUser(_id) {
    return this.delete(URL + '/user/' + _id);
  }
}