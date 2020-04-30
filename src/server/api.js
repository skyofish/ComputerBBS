import Axios from "./axios";
import da from "element-ui/src/locale/lang/da";

const Service = {
  // 登录接口
  login: data => Axios.post('/api/user/login', data),
  // 注册接口
  register: data => Axios.post('/api/user/register', data),
  // 修改个人资料接口
  updatePersonalInfo: data => Axios.post('/api/user/update', data),
  // 发帖接口
  postArticle: data => Axios.post('/api/article/post', data),
  // 获取文章列表接口
  getArticleList: data => Axios.post('/api/article/list', data),
  // 获取文章数据接口
  getArticleDetail: data => Axios.post('/api/article/detail', data),
  // 获取公告接口
  getAnnouncement: () => Axios.get('/api/getAnnouncement'),
  // 发布公告接口
  makeAnnouncement: data => Axios.post('/api/makeAnnouncement', data),
  // 获取版块接口
  getBlockList: () => Axios.get('/api/blockList'),
  // 评论接口
  comment: data => Axios.post('/api/article/comment', data),
  // 上传资料接口
  uploadFile: data => Axios.post('/api/file/upload', data),
  // 获取资料列表接口
  getResource: data => Axios.post('/api/file/list', data),
  // 下载资料接口
  downloadFile: data => Axios.post('/api/file/download', data),
  // 点赞接口
  like: data => Axios.post('/api/like', data),
  // 帖子加精接口
  articleElite: data => Axios.post('/api/article/elite', data),
  // 帖子置顶接口
  articleTop: data => Axios.post('/api/article/top', data),
  // 帖子删除和驳回接口
  articleRemove: data => Axios.post('/api/article/remove', data),
  // 帖子审核通过接口
  articleCheck: data => Axios.post('/api/article/check', data),
  // 获取用户列表接口
  userList: data => Axios.post('/api/user/list', data),
  // 用户封禁接口
  userLock: data => Axios.post('/api/user/lock', data),
  // 用户申请版主接口
  moderatorRuquest: data => Axios.post('/api/user/moderator', data),
  // 用户审核版主通过接口
  moderatorSuccess: data => Axios.post('/api/user/moderatorSuccess', data),
  // 用户审核版主失败接口
  moderatorFail: data => Axios.post('/api/user/moderatorFail', data)
}

export default Service;
