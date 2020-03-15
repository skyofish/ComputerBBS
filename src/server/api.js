import Axios from "./axios";

const Service = {
  // 登录接口
  login: data => Axios.post('/api/user/login', data),
  // 注册接口
  register: data => Axios.post('/api/user/register', data),
  // 发帖接口
  postArticle: data => Axios.post('/api/article/post', data),
  // 获取帖子数据接口
  getArticle: data => Axios.get('/api/article/get', data),
  // 获取公告接口
  getAnnouncement: data => Axios.get('/api/announcement', data),
}

export default Service;
