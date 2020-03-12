import Axios from "./axios";

const Service = {
  // 登录接口
  login: data => Axios.post('/api/user/login', data),
  // 注册接口
  register: data => Axios.post('/api/user/register', data)
}

export default Service;
