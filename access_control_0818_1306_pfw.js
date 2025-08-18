// 代码生成时间: 2025-08-18 13:06:37
const axios = require('axios');
const router = require('next/router');
const { Novu } = require('@novuhq/client');

// 引入NUXT框架中的store
const store = require('~/store');

// 配置Novu客户端
const novu = new Novu({
  apiKey: process.env.NOVU_API_KEY,
  endpoint: process.env.NOVU_ENDPOINT
});

// 获取当前用户信息
async function getCurrentUser(req) {
  const token = req.headers.authorization;
  const response = await axios.get('/api/user', {
    headers: { Authorization: token }
  });
  return response.data;
}

// 检查用户是否有访问权限
async function hasAccess(user, role) {
  if (!user) {
    throw new Error('用户未登录');
  }
  if (!user.roles.includes(role)) {
    throw new Error('没有访问权限');
  }
}

// 定义中间件，用于权限控制
async function accessControl(roles) {
  return async (req, res, next) => {
    try {
      const user = await getCurrentUser(req);
      await hasAccess(user, roles);
      next();
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  };
}

// 导出中间件
module.exports = accessControl;

// 使用示例
// router.addRoute({
//   path: '/admin',
//   component: () => import('~/components/Admin'),
//   middleware: accessControl('admin')
// });